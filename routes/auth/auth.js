const { Router } = require("express");
const { login, addUser } = require("../../controllers/auth/authController");
const authRouter = Router();

authRouter.post("/login", login);

authRouter.post('/addUser', addUser)

module.exports = authRouter;
