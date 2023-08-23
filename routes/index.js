const { Router } = require("express");
const authRouter = require("./auth/auth");
const adminRouter = require("./admin/admin");
const scmRouter = require("./user/scm");

const appRouters = Router();

appRouters.use("/auth", authRouter);
appRouters.use("/admin", adminRouter);
appRouters.use("/scm", scmRouter);

module.exports = appRouters;
