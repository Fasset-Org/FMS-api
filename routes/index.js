const { Router } = require("express");
const authRouter = require("./auth/auth");
const adminRouter = require("./admin/admin");
const scmRouter = require("./user/scm");
const HumanResourceRouter = require("./user/humanResource");
const assetManagementRouter = require("./user/assetManagement");

const appRouters = Router();

appRouters.use("/auth", authRouter);
appRouters.use("/admin", adminRouter);
appRouters.use("/scm", scmRouter);
appRouters.use("/humanResource", HumanResourceRouter);
appRouters.use("/assetManagement", assetManagementRouter);
module.exports = appRouters;
