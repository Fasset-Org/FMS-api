const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const { addTender } = require("../../controllers/user/scmController");

const scmRouter = Router();

scmRouter.post("/tender", AuthMid, addTender);

module.exports = scmRouter;
