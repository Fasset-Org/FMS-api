const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addQualification
} = require("../../controllers/user/humanResourceController");

const HumanResourceRouter = Router();

HumanResourceRouter.post("/qualification", AuthMid, addQualification);

module.exports = HumanResourceRouter;
