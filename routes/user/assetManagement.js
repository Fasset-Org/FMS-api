const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  editDevice,
  deleteDevice,
  addDevice,
  getAllDevice,
  editLicenseSubscription,
  addLicenseSubscription,
  deleteLicenseSubscription,
  addSimcards,
  editSimcards,
  deleteSimcards,
  getAllSimcards,
  getAllLicenseSubscription,
} = require("../../controllers/user/assetManagementController");

const assetManagementRouter = Router();
// devices Routes
assetManagementRouter.post("/device", AuthMid, addDevice);
assetManagementRouter.put("/device/:deviceId", AuthMid, editDevice);
assetManagementRouter.delete("/device/:deviceId", AuthMid, deleteDevice);
assetManagementRouter.get("/devices", AuthMid, getAllDevice);
//LicenseSubscription
assetManagementRouter.post(
  "/licensesubscription",
  AuthMid,
  addLicenseSubscription
);
assetManagementRouter.put(
  "/licensesubscription/:licensesubscriptionId",
  AuthMid,
  editLicenseSubscription
);
assetManagementRouter.delete(
  "/licensesubscription/:licensesubscriptionId",
  AuthMid,
  deleteLicenseSubscription
);
assetManagementRouter.get(
  "/licensesubscriptions",
  AuthMid,
  getAllLicenseSubscription
);
//Simcards
assetManagementRouter.post("/simcards", AuthMid, addSimcards);
assetManagementRouter.put("/simcards/:simcardsId", AuthMid, editSimcards);
assetManagementRouter.delete("/simcards/:simcardsId", AuthMid, deleteSimcards);
assetManagementRouter.get("/simcards", AuthMid, getAllSimcards);

module.exports = assetManagementRouter;
