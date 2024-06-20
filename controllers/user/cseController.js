const { Op } = require("sequelize");
const {
  DocumentTitle,
  Document,
  GeneralNotice,
  GrantWindowApplication,
  Banner,
  Board,
  Committee,
  CommitteeName,
  AnnualReport,
  ResearchReport
} = require("../../models");
const { ApiResponse, ApiError } = require("../../utils/response");
const { v4: UUIDV4 } = require("uuid");

const CSEController = {
  addDocumentTitle: async (req, res, next) => {
    try {
      await DocumentTitle.create(req.body);
      return res
        .status(201)
        .json(ApiResponse("Document title created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  editDownloadsTitle: async (req, res, next) => {
    try {
      const { downloadsTitleId } = req.params;

      const documentTitle = await DocumentTitle.findOne({
        where: { id: downloadsTitleId }
      });

      if (!documentTitle) {
        throw new ApiError("Error updating downloads title", 404);
      }

      await documentTitle.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResponse("Downloads title updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllDocumentTitleById: async (req, res, next) => {
    try {
      const { titleId } = req.params;

      const documentTitle = await DocumentTitle.findOne({
        where: { id: titleId }
      });

      return res
        .status(200)
        .json(
          ApiResponse("Document title fetched", "documentTitle", documentTitle)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllDocumentTitles: async (req, res, next) => {
    try {
      const documentTitles = await DocumentTitle.findAll({
        include: [Document],
        order: [["createdAt"]]
      });

      return res
        .status(200)
        .json(ApiResponse("Titles fetched", "titles", documentTitles));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  addDocument: async (req, res, next) => {
    try {
      const file = req.files.documentFile;
      const originalFileName = file.name;
      const fileName = UUIDV4();
      const fileExt = file.name.split(".")[1];

      file.mv(
        `${process.env.DOWNLOADS_DOCUMENTS_FOLDER}/${fileName}.${fileExt}`
      );

      await Document.create({
        originalFileName: originalFileName,
        fileName: fileName,
        documentName: req.body.documentName,
        documentTitleId: req.body.titleId
      });

      return res
        .status(201)
        .json(ApiResponse(`Document added to ${req.body.title} successfully`));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllDocuments: async (req, res, next) => {
    try {
      const documents = await Document.findAll();

      return res
        .status(200)
        .json(ApiResponse("Documents fetched", "documents", documents));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteDocument: async (req, res, next) => {
    try {
      const { documentId } = req.params;

      await Document.destroy({ where: { id: documentId } });

      return res.status(200).json(ApiResponse("Document deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addGeneralNotice: async (req, res, next) => {
    try {
      await GeneralNotice.create(req.body);

      return res
        .status(201)
        .json(ApiResponse("General notice added successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editGeneralNotice: async (req, res, next) => {
    try {
      const { generalNoticeId } = req.params;

      const generalNotice = await GeneralNotice.findOne({
        where: { id: generalNoticeId }
      });

      if (!generalNotice)
        throw new ApiError("Error updating general notice", 404);

      await generalNotice.update(req.body);

      return res
        .status(200)
        .json(ApiResponse("General notice updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  deleteGeneralNotice: async (req, res, next) => {
    try {
      const { generalNoticeId } = req.params;

      await GeneralNotice.destroy({ where: { id: generalNoticeId } });
      return res
        .status(200)
        .json(ApiResponse("General notice deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllGeneralNotices: async (req, res, next) => {
    try {
      const notices = await GeneralNotice.findAll({
        order: [["createdAt", "DESC"]]
      });

      return res
        .status(200)
        .json(ApiResponse("All notices fetched", "notices", notices));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addGrantWindow: async (req, res, next) => {
    try {
      await GrantWindowApplication.create(req.body);

      return res
        .status(201)
        .json(ApiResponse("Grant window created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  editGrantWindow: async (req, res, next) => {
    try {
      const { grantWindowId } = req.params;

      const grantWindow = await GrantWindowApplication.findOne({
        where: { id: grantWindowId }
      });

      if (!grantWindow)
        throw new ApiError("Error updating window application", 404);

      await grantWindow.update(req.body);

      return res
        .status(200)
        .json(ApiResponse("Grant window updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  deleteGrantWindow: async (req, res, next) => {
    try {
      const { generalNoticeId } = req.params;

      await GrantWindowApplication.destroy({ where: { id: generalNoticeId } });

      return res
        .status(200)
        .json(ApiResponse("Grant window deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllGrantWindows: async (req, res, next) => {
    try {
      const grants = await GrantWindowApplication.findAll({
        where: {
          closingDate: {
            [Op.gt]: new Date()
          }
        }
      });

      return res
        .status(200)
        .json(ApiResponse("All grants fetched", "grants", grants));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addBannerImage: async (req, res, next) => {
    try {
      const imageFile = req.files?.imageFile;

      if (!imageFile) throw new ApiError("Error saving banner image", 4000);

      const save = imageFile.mv(
        `${process.env.BANNER_IMAGE_FOLDER}/${imageFile.name}`
      );

      if (!save) throw new ApiError("Error saving banner image", 400);

      await Banner.create({ bannerImageURL: imageFile.name });

      return res
        .status(201)
        .json(ApiResponse("Banner image uploaded successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  getAllBannerImages: async (req, res, next) => {
    try {
      const banners = await Banner.findAll({ order: [["createdAt", "DESC"]] });

      return res
        .status(200)
        .json(ApiResponse("All banners fetched", "banners", banners));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  deleteBannerImage: async (req, res, next) => {
    try {
      const { bannerImageId } = req.params;

      await Banner.destroy({ where: { id: bannerImageId } });

      return res
        .status(200)
        .json(ApiResponse("Banner image deleted successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  addBoardMember: async (req, res, next) => {
    try {
      const boardMemberImageFile = req.files?.file;

      if (!boardMemberImageFile)
        throw new ApiError("Error saving board member", 400);

      const save = boardMemberImageFile.mv(
        `${process.env.BOARD_MEMBERS_FOLDER}/${boardMemberImageFile.name}`
      );

      if (!save) throw new ApiError("Error saving board member", 400);

      await Board.create({
        ...req.body,
        imageFileURL: boardMemberImageFile.name
      });

      return res
        .status(201)
        .json(ApiResponse("Board member added successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },
  editBoardMember: async (req, res, next) => {
    try {
      const { boardMemberId } = req.body;

      const boardMember = await Board.findOne({ where: { id: boardMemberId } });

      if (!boardMember) throw new ApiError("Error updating board member", 404);

      let boardMemberImageName = "";
      const boardMemberImageFile = req.files?.file;

      if (boardMemberImageFile) {
        const save = boardMemberImageFile.mv(
          `${process.env.BOARD_MEMBERS_FOLDER}/${boardMemberImageFile.name}`
        );

        if (!save) throw new ApiError("Error saving board member", 400);

        boardMemberImageName = boardMemberImageFile.name;
      } else {
        boardMemberImageName = boardMember.imageFileURL;
      }

      await boardMember.update({
        ...req.body,
        imageFileURL: boardMemberImageName
      });

      return res
        .status(200)
        .json(ApiResponse("Board member updated successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  getAllBoardMembers: async (req, res, next) => {
    try {
      const boardMembers = await Board.findAll({
        order: [["createdAt", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse("Board members fetched", "boardMembers", boardMembers)
        );
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  deleteBoardMember: async (req, res, next) => {
    try {
      const { boardMemberId } = req.params;

      await Board.destroy({ where: { id: boardMemberId } });

      return res
        .status(200)
        .json(ApiResponse("Board member deleted successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  addCommitte: async (req, res, next) => {
    try {
      await CommitteeName.create(req.body);

      return res.status(201).json(ApiResponse("Committee added successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editCommittee: async (req, res, next) => {
    try {
      const { committeeId } = req.params;

      const committee = await CommitteeName.findOne({
        where: { id: committeeId }
      });

      await committee.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResponse("Committee updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllCommittees: async (req, res, next) => {
    try {
      const committees = await CommitteeName.findAll({
        include: [{ model: Committee }]
      });

      return res
        .status(200)
        .json(ApiResponse("Committees fetched", "committees", committees));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteCommitee: async (req, res, next) => {
    try {
      const { committeeId } = req.params;

      await CommitteeName.destroy({ where: { id: committeeId } });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addCommitteeMember: async (req, res, next) => {
    try {
      const committeeMemberImageFile = req.files?.file;

      if (committeeMemberImageFile) {
        const save = committeeMemberImageFile.mv(
          `${process.env.BOARD_MEMBERS_FOLDER}/${committeeMemberImageFile.name}`
        );

        if (!save) throw new ApiError("Error saving committee member", 400);
      }

      await Committee.create({
        ...req.body,
        imageFileURL: committeeMemberImageFile?.name || ""
      });

      return res
        .status(201)
        .json(ApiResponse("Committee member added successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },
  editCommitteeMember: async (req, res, next) => {
    try {
      const { committeeMemberId } = req.body;

      const committeeMember = await Committee.findOne({
        where: { id: committeeMemberId }
      });

      if (!committeeMember)
        throw new ApiError("Error updating committee member", 404);

      let committeeMemberImageName = "";
      const committeeMemberImageFile = req.files?.file;

      if (committeeMemberImageFile) {
        const save = committeeMemberImageFile.mv(
          `${process.env.BOARD_MEMBERS_FOLDER}/${committeeMemberImageFile.name}`
        );

        if (!save) throw new ApiError("Error saving committee member", 400);

        committeeMemberImageName = committeeMemberImageFile.name;
      } else {
        committeeMemberImageName = committeeMember.imageFileURL;
      }

      await committeeMember.update({
        ...req.body,
        imageFileURL: committeeMemberImageName
      });

      return res
        .status(200)
        .json(ApiResponse("Committee member updated successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  getAllCommitteeMembers: async (req, res, next) => {
    try {
      const { committeeNameId } = req.params;

      const committeeMembers = await Committee.findAll({
        where: { committeeNameId: committeeNameId }
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Committee members fetched",
            "committeeMembers",
            committeeMembers
          )
        );
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  deleteCommitteeMember: async (req, res, next) => {
    try {
      const { committeeMemberId } = req.params;

      await Committee.destroy({ where: { id: committeeMemberId } });

      return res
        .status(200)
        .json(ApiResponse("Committee member deleted successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  addAnnualReport: async (req, res, next) => {
    try {
      const reportFile = req.files?.file;

      if (!reportFile) throw new ApiError("Error saving annual report", 400);

      const save = reportFile.mv(
        `${process.env.ANNUAL_REPORTS_FOLDER}/${reportFile.name}`
      );

      if (!save) throw new ApiError("Error saving annual reports", 400);

      await AnnualReport.create({
        ...req.body,
        annualReportFileURL: reportFile.name
      });

      return res
        .status(201)
        .json(ApiResponse("Annual report added successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  editAnnualReport: async (req, res, next) => {
    try {
      const { annualReportId } = req.body;

      const annualReport = await AnnualReport.findOne({
        where: { id: annualReportId }
      });

      if (!annualReport)
        throw new ApiError("Error updating annual report", 404);

      const reportFile = req.file?.file;
      let reportFileName = "";

      if (reportFile) {
        const save = reportFile.mv(
          `${process.env.ANNUAL_REPORTS_FOLDER}/${reportFile.name}`
        );

        if (!save) throw new ApiError("Error saving annual report", 400);

        reportFileName = reportFile.name;
      } else {
        reportFileName = annualReport.annualReportFileURL;
      }

      await annualReport.update({
        ...req.body,
        annualReportFileURL: reportFileName
      });

      return res
        .status(200)
        .json(ApiResponse("Annual report updated successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  getAllAnnualReports: async (req, res, next) => {
    try {
      const annualReports = await AnnualReport.findAll();

      return res
        .status(200)
        .json(
          ApiResponse("Annual reports fetched", "annualReports", annualReports)
        );
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  deleteAnnualReport: async (req, res, next) => {
    try {
      const { annualReportId } = req.params;

      await AnnualReport.destroy({ where: { id: annualReportId } });

      return res
        .status(200)
        .json(ApiResponse("Annual report deleted successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  addResearchReport: async (req, res, next) => {
    try {
      const researchFile = req.files?.file;

      if (!researchFile)
        throw new ApiError("Error saving research report", 400);

      const save = researchFile.mv(
        `${process.env.RESEARCH_REPORTS_FOLDER}/${researchFile.name}`
      );

      if (!save) throw new ApiError("Error saving reserach reports", 400);

      await ResearchReport.create({
        ...req.body,
        researchReportFileURL: researchFile.name
      });

      return res
        .status(201)
        .json(ApiResponse("Annual research added successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  editResearchReport: async (req, res, next) => {
    try {
      const { researchReportId } = req.body;

      console.log(req.body);

      const researchReport = await ResearchReport.findOne({
        where: { id: researchReportId }
      });

      if (!researchReport)
        throw new ApiError("Error updating research report", 404);

      const researchFile = req.file?.file;
      let researchFileName = "";

      if (researchFile) {
        const save = researchFile.mv(
          `${process.env.RESEARCH_REPORTS_FOLDER}/${researchFile.name}`
        );

        if (!save) throw new ApiError("Error saving research report", 400);

        researchFileName = researchFile.name;
      } else {
        researchFileName = researchReport.annualReportFileURL;
      }

      await researchReport.update({
        ...req.body,
        researchReportFileURL: researchFileName
      });

      return res
        .status(200)
        .json(ApiResponse("Annual report updated successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  getAllResearchReports: async (req, res, next) => {
    try {
      const researchReports = await ResearchReport.findAll();

      return res
        .status(200)
        .json(
          ApiResponse(
            "Annual reports fetched",
            "researchReports",
            researchReports
          )
        );
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  deleteResearchReport: async (req, res, next) => {
    try {
      const { researchReportId } = req.params;

      await ResearchReport.destroy({ where: { id: researchReportId } });

      return res
        .status(200)
        .json(ApiResponse("Annual research deleted successfully"));
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  downloadDocument: (req, res, next) => {
    try {
      const filePath = `${process.env.DOWNLOADS_DOCUMENTS_FOLDER}/${req.query.fileName}`;

      return res.download(filePath);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error happened"
      });
    }
  },

  downloadAnnualReportsDocument: (req, res, next) => {
    try {
      const filePath = `${process.env.ANNUAL_REPORTS_FOLDER}/${req.query.fileName}`;

      return res.download(filePath);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error happened"
      });
    }
  },

  downloadResearchReportsDocument: (req, res, next) => {
    try {
      const filePath = `${process.env.RESEARCH_REPORTS_FOLDER}/${req.query.fileName}`;

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

module.exports = CSEController;
