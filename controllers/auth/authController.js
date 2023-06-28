const {
  sequelize,
  User,
  UserModule,
  Role,
  Module,
  Department
} = require("../../models");
const { ApiResponse, ApiError } = require("../../utils/response");
const sendEmail = require("../../utils/sendEmail");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");
const {
  COOKIE_REFRESH_TOKEN,
  REFRESH_SESSION_COOKIE_OPTIONS
} = require("../../utils/helper");

const AuthController = {
  addUser: async (req, res, next) => {
    try {
      // check if user exist
      const userExist = await User.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { userName: req.body.email }]
        }
      });

      // if user exist return error
      if (userExist) throw new ApiError("Email/Username already taken", 409);

      // create reset password token
      // const resetPasswordToken = crypto.randomBytes(48).toString("hex");
      const resetPasswordToken = helper.getJWTtoken(
        { email: req.body.email },
        process.env.JWT_RESET_KEY,
        `${60 * 7}s`
      );

      // create user
      const user = await User.create({
        ...req.body,
        resetPasswordToken: resetPasswordToken
      });

      const html = `
        Dear ${user.email} <br /> 
        Please note that you have been added to FMS, if you are not aware of  
        this action please contact devsupport@fasset.org.za <br /> or. <br /> 
        Click <a href="${process.env.APP_URL}/resetPassword/${resetPasswordToken}">here</a> to reset your password
      `;

      sendEmail({
        email: user.email,
        subject: "FMS Password reset",
        html: html
      });

      return res
        .status(201)
        .json(ApiResponse("User added successfully", "user", user));
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      console.log(email, password);

      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { userName: email }]
        },
        raw: true,
        nest: true,
        // attributes: {
        //   exclude: ["password"]
        // },
        include: [
          { model: Role, as: "role" },
          { model: Department, as: "department" },
          {
            model: UserModule,
            as: "userModules",
            include: [{ model: Module, as: "module" }]
          }
        ]
      });

      if (!user) throw new ApiError("Invalid credentials", 404);

      // check password
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);

      if (!isPasswordCorrect) throw new ApiError("Invalid credentials", 404);

      const token = helper.getJWTtoken(
        { ...user, password: "" },
        process.env.JWT_ACCESS_KEY,
        `420s`
      );

      const refreshToken = helper.getJWTtoken(
        { ...user, password: "" },
        process.env.JWT_REFRESH_KEY
      );

      res.cookie(
        process.env.COOKIE_ACCESS_TOKEN,
        token,
        SESSION_COOKIE_OPTIONS
      );
      res.cookie(
        process.env.COOKIE_REFRESH_TOKEN,
        refreshToken,
        REFRESH_SESSION_COOKIE_OPTIONS
      );

      return res.status(200).json(
        ApiResponse("User login in successfully", "user", {
          ...user,
          password: "",
          token: token,
          refreshToken: refreshToken
        })
      );
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  isLoggedIn: (req, res, next) => {
	
  }
};

module.exports = AuthController;
