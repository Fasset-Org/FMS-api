const { DocumentTitle, Document } = require("../../models");
const { ApiResponse } = require("../../utils/response");
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
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};

module.exports = CSEController;
