const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addDocumentTitle,
  getAllDocumentTitles,
  editDownloadsTitle,
  getAllDocumentTitleById,
  addDocument,
  getAllDocuments,
  deleteDocument
} = require("../../controllers/user/cseController");

const CSERouter = Router();

CSERouter.post("/downloadsTitle", AuthMid, addDocumentTitle);
CSERouter.get("/downloadsTitle", AuthMid, getAllDocumentTitles);
CSERouter.put('/downloadsTitle/:downloadsTitleId', AuthMid, editDownloadsTitle);
CSERouter.get('/documentTitle/:titleId', AuthMid, getAllDocumentTitleById);
CSERouter.post('/addDocument', AuthMid, addDocument);
CSERouter.get('/documents', AuthMid, getAllDocuments);
CSERouter.delete('/deleteDocument/:documentId', AuthMid, deleteDocument)

module.exports = CSERouter;
