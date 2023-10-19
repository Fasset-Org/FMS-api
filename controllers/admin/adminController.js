const { Department, Module, User } = require("../../models");
const { ApiError, ApiResponse } = require("../../utils/response");

const AdminController = {
  addDepartment: async (req, res, next) => {
    try {
      const department = await Department.create({ ...req.body });

      if (!department) throw new ApiError("Error creating department", 400);

      return res
        .status(201)
        .json(ApiResponse("Department created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  editDepartment: async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const department = await Department.findOne({
        where: { id: departmentId }
      });

      if (!department) throw new ApiError("Department not found", 404);

      await department.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResponse("Department updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllDepartments: async (req, res, next) => {
    try {
      const departments = await Department.findAll();

      return res
        .status(200)
        .json(
          ApiResponse(
            "All departments fecthed successfully",
            "departments",
            departments
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addModule: async (req, res, next) => {
    try {
      const module = await Module.create({ ...req.body });

      if (!module) throw new ApiError("Error creating module", 400);

      return res.status(201).json(ApiResponse("Module created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editModule: async (req, res, next) => {
    try {
      const { moduleId } = req.params;

      const module = await Module.findOne({ where: { id: moduleId } });

      if (!module) throw new ApiError("Module not found", 404);

      return res.status(200).json(ApiResponse("Module updated successfully"));
    } catch (e) {
      console.log(e);
    }
  },

  getAllModules: async (req, res, next) => {
    try {
      const modules = await Module.findAll();

      return res
        .status(200)
        .json(ApiResponse("Module fetched successfully", "modules", modules));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  editUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findOne({ where: { id: userId } });

      if (!user) throw new ApiError("Error updating a user", 404);

      await user.update({...req.body})

      return res.status(200).json(ApiResponse("User updated successfully"));
    } catch (e) {
      console.log(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await User.destroy({ where: { id: userId } });

      return res.status(200).json({
        success: false,
        message: "User deleted successfully"
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll();

      return res.status(200).json(ApiResponse("Users fetched", "users", users));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  
};

module.exports = AdminController;
