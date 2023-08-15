const { Department, Module } = require("../../models");
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
  }
};

module.exports = AdminController;
