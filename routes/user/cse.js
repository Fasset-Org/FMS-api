const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addDocumentTitle,
  getAllDocumentTitles
} = require("../../controllers/user/cseController");

const CSERouter = Router();

CSERouter.post("/downloadsTitle", AuthMid, addDocumentTitle);
CSERouter.get("/downloadsTitle", AuthMid, getAllDocumentTitles);

module.exports = CSERouter;
