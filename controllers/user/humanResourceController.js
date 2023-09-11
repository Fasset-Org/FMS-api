const { Op } = require("sequelize");
const {
  Qualification,
  PositionQuestion,
  PositionQualification,
  Position,
  sequelize,
  Department
} = require("../../models");
const { ApiResponse, ApiError } = require("../../utils/response");

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
  }
};

module.exports = HumanResourceController;
