const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addTender,
  getAllCurrentTenders,
  getAllPreviousTenders,
  editTender,
  editSCMTender,
  deActivateTender
} = require("../../controllers/user/scmController");

const scmRouter = Router();

scmRouter.post("/tender", AuthMid, addTender);
scmRouter.get("/currentTenders", AuthMid, getAllCurrentTenders);
scmRouter.get("/previousTenders", AuthMid, getAllPreviousTenders);
scmRouter.put("/tender", AuthMid, editSCMTender);
scmRouter.delete('/tender/:tenderId', AuthMid, deActivateTender)

module.exports = scmRouter;
