const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const { addDocumentTitle } = require("../../controllers/user/cseController");

const CSERouter = Router();

CSERouter.post("/downloadsTitle", AuthMid, addDocumentTitle);

module.exports = CSERouter;
