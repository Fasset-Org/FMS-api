const { Router } = require("express");
const { loginUser, addUser } = require("../../controllers/auth/authController");
const authRouter = Router();

authRouter.post("/login", loginUser);

authRouter.post("/addUser", addUser);

module.exports = authRouter;
