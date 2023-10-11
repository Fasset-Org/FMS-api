const { Op } = require("sequelize");
const {
  Qualification,
  PositionQuestion,
  PositionQualification,
  Position,
  sequelize,
  Department,
  Application
} = require("../../models");
const { ApiResponse, ApiError } = require("../../utils/response");
const fs = require("node:fs");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../utils/sendEmail");

const HumanResourceController = {
  addQualification: async (req, res, next) => {
    try {
      await Qualification.create({ ...req.body });

      return res
        .status(201)
        .json(ApiResponse("Qualification created successfully"));
    } catch (e) {
      console.log(e); // debugging
      next(e);
    }
  },
  getAllQualifications: async (req, res, next) => {
    try {
      const qualifications = await Qualification.findAll();

      return res
        .status(200)
        .json(
          ApiResponse(
            "Qualification fetched successfully",
            "qualifications",
            qualifications
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addPosition: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      const jobSpecDocument = req?.files?.jobSpecDocumentName;

      if (!jobSpecDocument) throw new ApiError("Error creating position", 400);

      let position = await Position.create(
        { ...req.body, jobSpecDocumentName: jobSpecDocument.name },
        { transaction: t }
      );

      const qualifications = JSON.parse(req.body.qualifications);

      for (const qualification of qualifications) {
        await PositionQualification.create(
          {
            qualificationId: qualification.value,
            positionId: position.id
          },
          { transaction: t }
        );
      }
      await t.commit();
      position = await Position.findOne({
        where: { id: position.id },
        include: [PositionQualification, PositionQuestion]
      });

      // save file after all db request are successful
      const save = jobSpecDocument.mv(
        `${process.env.POSITION_DOCUMENT_FOLDER}/${jobSpecDocument.name}`
      );

      if (!save) {
        // if error saving the document rollback all db request

        t.rollback();
        throw new ApiError("Error creating position", 400);
      }

      return res
        .status(201)
        .json(
          ApiResponse("Position created successfully", "position", position)
        );
    } catch (e) {
      console.log(e);
      await t.rollback();
      next(e);
    }
  },

  editPosition: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      const { positionId } = req.params;

      const jobSpecDocument = req?.files?.jobSpecDocumentName;

      const position = await Position.findOne({ where: { id: positionId } });

      // destroy all qualifications and add the new ones
      await PositionQualification.destroy({
        where: { positionId: position.id }
      });

      const qualifications = JSON.parse(req.body.qualifications);

      for (const qualification of qualifications) {
        await PositionQualification.create(
          {
            qualificationId: qualification.value,
            positionId: position.id
          },
          { transaction: t }
        );
      }

      let fileName = "";

      // if new document uploaded
      if (jobSpecDocument) {
        const save = jobSpecDocument.mv(
          `${process.env.POSITION_DOCUMENT_FOLDER}/${jobSpecDocument.name}`
        );

        fileName = jobSpecDocument.name;
      } else {
        fileName = position.jobSpecDocumentName;
      }

      await position.update(
        { ...req.body, jobSpecDocumentName: fileName },
        { transaction: t }
      );

      await t.commit();

      return res
        .status(201)
        .json(
          ApiResponse("Position updated successfully", "position", position)
        );
    } catch (e) {
      console.log(e);
      await t.rollback();
      next(e);
    }
  },

  getPositionById: async (req, res, next) => {
    try {
      const { positionId } = req.params;

      const position = await Position.findOne({
        where: { id: positionId },
        include: [
          { model: PositionQualification, include: Qualification },
          PositionQuestion,
          Department
        ]
      });

      if (!position) throw new ApiError("Error fetching the position", 404);

      return res
        .status(200)
        .json(
          ApiResponse("Position fetched successfully", "position", position)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deletePosition: async (req, res, next) => {
    try {
      const { positionId } = req.params;

      await Position.destroy({ where: { id: positionId } });

      return res.status(200).json(ApiResponse("Position deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllPositions: async (req, res, next) => {
    try {
      const positions = await Position.findAll({
        where: { closingDate: { [Op.gte]: new Date() } },
        include: [Department],
        order: [["createdAt", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse("Position feched successfully", "positions", positions)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllPreviousPositions: async (req, res, next) => {
    try {
      const positions = await Position.findAll({
        where: { closingDate: { [Op.lte]: new Date() } },
        include: [Department],
        order: [["createdAt", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse("Position feched successfully", "positions", positions)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  addPositionQuestion: async (req, res, next) => {
    try {
      await PositionQuestion.create({ ...req.body });

      return res
        .status(200)
        .json(ApiResponse("Position question created successfully"));
    } catch (e) {
      console.log(e);
      if (e.errors)
        next(
          new ApiError(
            "Please save position first before adding questions to it",
            422
          )
        );
      next(e);
    }
  },
  deletePositionQuestion: async (req, res, next) => {
    try {
      const { questionId } = req.params;

      const question = await PositionQuestion.findOne({
        where: { id: questionId }
      });

      if (!question) throw new ApiError("Error deleting question", 404);

      await question.destroy();

      return res.status(200).json(ApiResponse("Question deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  downloadJobSpecDocument: (req, res, next) => {
    try {
      const filePath = `${process.env.POSITION_DOCUMENT_FOLDER}/${req.query.filename}`;

      return res.download(filePath);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error happened"
      });
    }
  },
  jobApplication: async (req, res, next) => {
    try {
      const { email, jobTitle, positionId } = req.body;

      const emailExist = await Application.findOne({ where: { email: email } });

      const position = await Position.findOne({ where: { id: positionId } });

      if (emailExist) {
        throw new ApiError("You have already applied for this position", 400);
      }

      const dir = `${process.env.POSITIONS_DOCUMENTS_FOLDER}/${position.jobTitle}`;
      const userDir = `${dir}/${email}`;
      // make position directory
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // make user directory inside position directory
      fs.mkdirSync(userDir, { recursive: true });

      // save all files
      for (const [key, value] of Object.entries(req.files)) {
        const file = req.files[key];
        file.mv(`${userDir}/${file.name}`);
      }

      await Application.create({
        ...req.body,
        resumeDocumentName: req.files.resumeDocumentName.name,
        idDocumentName: req.files.idDocumentName.name,
        matricDocumentName: req.files.matricDocumentName.name,
        qualificationDocumentName: req.files.qualificationDocumentName.name,
        status: "submitted"
      });

      // send email to user to human resource
      const userOptions = {
        email: email,
        subject: `${position.jobTitle} - Automatic Reply`,
        html: `<p>Dear ${req.body.fullname}</p><p>We thank you for showing interest to join FASSET and hereby 
                acknowledge receipt of your application for the above position. Please note that your application 
                is receiving attention from the HR Department.</p> <p>If you have not received communication 
                within 6 weeks from the closing date, kindly consider your application as unsuccessful.</p> 
                <p>Kind Regards,</p><p>FASSET HR TEAM</p><p>1st Floor, 296 Kent Avenue, Ferndale, Randburg, 2194 
                PO Box 6801, Cresta, 2118</p>`
      };

      sendEmail(userOptions);

      const hrOptions = {
        email: position.applicationsEmail,
        subject: `${req.body.fullname} - ${position.jobTitle} Application`,
        html: `<p>Dear Hiring Manager</p><br /><p>Please received application of ${req.body.fullname}</p>
        <br /><p>To view application please click 
        <a href="${process.env.APP_URL}/humanResource/jobApplications">here</a>
        </p>
        `
      };
      sendEmail(hrOptions);

      return res
        .status(201)
        .json(
          ApiResponse(
            "Application submitted successfully, check your email for job reference"
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getPositionApplications: async (req, res, next) => {
    try {
      const { positionId } = req.params;

      const applications = await Application.findAll({
        where: { positionId: positionId },
        order: [["createdAt", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse("Applications fetched", "applications", applications)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getPositionApplicationById: async (req, res, next) => {
    try {
      const { positionId, applicationId } = req.params;

      const application = await Application.findOne({
        where: {
          [Op.and]: [{ id: applicationId }, { positionId: positionId }]
        }
      });

      return res
        .status(200)
        .json(ApiResponse("Application fetched", "application", application));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  shortListApplication: async (req, res, next) => {
    try {
      const { applicationId, positionId } = req.params;

      const application = await Application.findOne({
        where: { [Op.and]: [{ id: applicationId }, { positionId: positionId }] }
      });

      if (!application) {
        throw new ApiError("Error deleting the application", 404);
      }

      await application.update({ status: "shortlisted" });

      return res
        .status(200)
        .json(ApiResponse("Application shortlisted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  rejectApplication: async (req, res, next) => {
    try {
      const { applicationId } = req.params;

      const application = await Application.findOne({
        where: { id: applicationId },
        include: [Position]
      });

      if (!application) {
        throw new ApiError("Error rejecting application", 404);
      }

      await application.update({ status: "rejected" });

      const emailOptions = {
        email: application.email,
        subject: `${application.Position.jobTitle}`,
        html: `<p>Dear ${application.fullname}</p><p>Thank you for applying for ${application.Position.jobTitle} .</p>
        <p>
        <p>There have been several applications and after careful consideration we decided to continue with other 
         applications.</p>
        <p>We thank you sincerely for your efforts and wish you all the best in your job search and securing a new        
         role</p>
         <p>We do appreciate your interest in us, and we would like to retain your details on file should a more suitable 
          position arise.</p>
          <p>Kind Regards,</p>
          <p>Fasset HR Team</p>
        `
      };

      sendEmail(emailOptions);

      return res
        .status(200)
        .json(
          ApiResponse(
            "Application rejected successfully",
            "application",
            application
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  rejectAllApplication: async (req, res, next) => {
    try {
      const { positionId } = req.params;

      const applications = await Application.update(
        { status: "rejected" },
        {
          where: {
            [Op.and]: [{ status: "submitted" }, { positionId: positionId }]
          }
        }
      );

      return res
        .status(200)
        .json(
          ApiResponse(
            "All submitted applications rejected successfully",
            "applications",
            applications
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  unSelectApplication: async (req, res, next) => {
    try {
      const { applicationId } = req.params;

      const application = await Application.findOne({
        where: { id: applicationId }
      });

      if (!application) {
        throw new ApiError("Error unselecting application", 404);
      }

      await application.update({ status: "submitted" });

      return res
        .status(200)
        .json(ApiResponse("Application status reseted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  downloadApplicationDocument: async (req, res, next) => {
    try {
      const { positionId, email, filename } = req.query;
      const position = await Position.findOne({ where: { id: positionId } });
      const filePath = `${process.env.POSITIONS_DOCUMENTS_FOLDER}/${position.jobTitle}/${email}/${filename}`;
      console.log(filePath);

      return res.download(filePath);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error happened"
      });
    }
  }
};

module.exports = HumanResourceController;
