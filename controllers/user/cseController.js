const { DocumentTitle, Document } = require("../../models");
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

      return res
        .status(200)
        .json(ApiResponse("Document deleted successfully"));
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = CSEController;
