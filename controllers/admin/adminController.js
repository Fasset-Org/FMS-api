const { Department } = require("../../models");
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

      if (!department) throw new ApiError("Department not found");

      await department.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResponse("Department updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllDepartment: async (req, res, next) => {
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
  }
};

module.exports = AdminController