const { DocumentTitle } = require("../../models");
const { ApiResponse } = require("../../utils/response");

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
