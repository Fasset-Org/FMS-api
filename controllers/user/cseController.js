const {
  DocumentTitle,
  Document,
  GeneralNotice,
  GrantWindowApplication
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
        order: [["createdAt", "DESC"]]
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

      file.mv(`${process.env.DOWNLOADS_DOCUMENTS_FOLDER}/${fileName}`);

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
        .json(ApiResponse("Grants window updated successfully"));
    } catch (e) {
      console.log(e);
      next(e)
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
  }
};

module.exports = CSEController;
