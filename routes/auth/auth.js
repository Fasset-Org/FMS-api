const { Router } = require("express");
const {
  loginUser,
  addUser,
  isUserLoggedIn
} = require("../../controllers/auth/authController");
const AuthMid = require("../../middlewares/authMid");
const authRouter = Router();

authRouter.post("/login", loginUser);

authRouter.post("/addUser", addUser);
authRouter.get("/isUserLoggedIn", AuthMid, isUserLoggedIn);

module.exports = authRouter;
