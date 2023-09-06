const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addQualification,
  getAllQualifications,
  addPositionQuestion,
  addPosition,
  getAllPositions,
  editPosition,
  getAllPositionById
} = require("../../controllers/user/humanResourceController");

const HumanResourceRouter = Router();

HumanResourceRouter.post("/qualification", AuthMid, addQualification);
HumanResourceRouter.get("/qualifications", AuthMid, getAllQualifications);
HumanResourceRouter.post("/position", AuthMid, addPosition);
HumanResourceRouter.put('/position/:positionId', AuthMid, editPosition);
HumanResourceRouter.get('/position/:positionId', AuthMid, getAllPositionById)
HumanResourceRouter.get('/positions', AuthMid, getAllPositions);
HumanResourceRouter.post("/positionQuestion", AuthMid, addPositionQuestion);



module.exports = HumanResourceRouter;
