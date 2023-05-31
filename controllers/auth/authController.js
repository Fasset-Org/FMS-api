const { sequelize, User, UserModule } = require("../../models");
const { ApiResponse, ApiError } = require("../../utils/response");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const { Op } = require("sequelize");

exports.addUser = async (req, res, next) => {
  const t = await sequelize.transaction();

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
    const resetPasswordToken = crypto.randomBytes(48).toString("hex");

    // create user
    const user = await User.create(
      { ...req.body, resetPasswordToken: resetPasswordToken },
      { transaction: t }
    );

    // create userModules
    req.body.userModules.forEach(async (userModuleId) => {
      await UserModule.create(
        {
          userId: user.id,
          moduleId: userModuleId
        },
        { transaction: t }
      );
    });
    await t.commit();

    const html = sendEmail({});
  } catch (err) {
    t.rollback();
    next(err);
  }
};

exports.login = (req, res, next) => {};
