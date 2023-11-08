const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addDocumentTitle,
  getAllDocumentTitles,
  editDownloadsTitle,
  getAllDocumentTitleById,
  addDocument,
  getAllDocuments,
  deleteDocument,
  addGeneralNotice,
  editGeneralNotice,
  deleteGeneralNotice,
  addGrantWindow,
  editGrantWindow,
  deleteGrantWindow
} = require("../../controllers/user/cseController");

const CSERouter = Router();

// Downloads routes
CSERouter.post("/downloadsTitle", AuthMid, addDocumentTitle);
CSERouter.get("/downloadsTitle", AuthMid, getAllDocumentTitles);
CSERouter.put('/downloadsTitle/:downloadsTitleId', AuthMid, editDownloadsTitle);
CSERouter.get('/documentTitle/:titleId', AuthMid, getAllDocumentTitleById);
CSERouter.post('/addDocument', AuthMid, addDocument);
CSERouter.get('/documents', AuthMid, getAllDocuments);
CSERouter.delete('/deleteDocument/:documentId', AuthMid, deleteDocument)

// Notice Board routes
CSERouter.post('/generalNotice', AuthMid, addGeneralNotice);
CSERouter.put('/generalNotice/:generalNoticeId', AuthMid, editGeneralNotice);
CSERouter.delete('/generalNotice/:generalNoticeId', AuthMid, deleteGeneralNotice);

CSERouter.post('/grantWindow', AuthMid, addGrantWindow);
CSERouter.put('/grantWindow/:grantWindowId', AuthMid, editGrantWindow);
CSERouter.delete('/grantWindow/:grantWindowId', AuthMid, deleteGrantWindow);

module.exports = CSERouter;
