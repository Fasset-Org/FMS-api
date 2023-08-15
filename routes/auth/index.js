const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("../admin");

const appRouters = Router();

appRouters.use("/auth", authRouter);
appRouters.use("/admin", adminRouter)

module.exports = appRouters;
