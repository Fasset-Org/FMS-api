import { Department, Device, User } from "../../models";
import Device from "../../models/device";
import { ApiError, ApiResponse } from "../../utils/response";

const DeviceController = {
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

  addDevice: async (req, res, next) => {
    try {
      const device = await Module.create({ ...req.body });

      if (!device) throw new ApiError("Error creating asset", 400);

      return res.status(201).json(ApiResponse("Asset created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editDevice: async (req, res, next) => {
    try {
      const { deviceId } = req.params;

      const asset = await Asset.findOne({ where: { id: deviceId } });

      if (!asset) throw new ApiError("Device not found", 404);

      return res.status(200).json(ApiResponse("DEVICE updated successfully"));
    } catch (e) {
      console.log(e);
    }
  },

  getAllDevice: async (req, res, next) => {
    try {
      const device = await Device.findAll();

      return res
        .status(200)
        .json(ApiResponse("Device fetched successfully", "device", Device));
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

asset.exports = DeviceController;