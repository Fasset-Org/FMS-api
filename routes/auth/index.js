const { Router } = require("express");
const authRouter = require("./auth");

const appRouters = Router();

appRouters.use("/auth", authRouter);

module.exports = appRouters;
