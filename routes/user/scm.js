const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addTender,
  getAllCurrentTenders,
  getAllPreviousTenders,
  editTender
} = require("../../controllers/user/scmController");

const scmRouter = Router();

scmRouter.post("/tender", AuthMid, addTender);
scmRouter.get("/currentTenders", AuthMid, getAllCurrentTenders);
scmRouter.get("/previousTenders", AuthMid, getAllPreviousTenders);
scmRouter.put("/tender", AuthMid, editTender);

module.exports = scmRouter;
