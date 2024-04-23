const { ApiError, ApiResponse } = require("../../utils/response");
const { Device } = require("../../models");
const { LicenseSubscription } = require("../../models");
const { Simcards, User, Role, Department } = require("../../models");
const e = require("cors");

const assetManagementController = {
  addDevice: async (req, res, next) => {
    try {
      const device = await Device.create({ ...req.body });

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

      const device = await Device.findOne({ where: { id: deviceId } });

      if (!device) throw new ApiError("Device not found", 404);

      await device.update({ ...req.body });

      return res.status(200).json(ApiResponse("DEVICE updated successfully"));
    } catch (e) {
      console.log(e);
    }
  },
  deleteDevice: async (req, res, next) => {
    try {
      const { deviceId } = req.params;
      await Device.destroy({ where: { id: deviceId } });

      return res.status(200).json(ApiResponse("Device deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllDevice: async (req, res, next) => {
    try {
      const devices = await Device.findAll({
        include: [
          {
            model: User,
            include: [
              { model: Role, as: "role" },
              { model: Department, as: "department" },
            ],
          },
        ],
      });

      // console.log(devices);

      return res
        .status(200)
        .json(ApiResponse("Devices fetched successfully", "devices", devices));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addLicenseSubscription: async (req, res, next) => {
    try {
      const licensesubscription = await LicenseSubscription.create({
        ...req.body,
      });

      if (!licensesubscription) throw ApiError("Error creating asset", 400);

      return res.status(201).json(ApiResponse("Asset created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  editLicenseSubscription: async (req, res, next) => {
    try {
      const { licensesubscriptionId } = req.params;

      const licensesubscription = await LicenseSubscription.findOne({
        where: { id: licensesubscriptionId },
      });
      if (!licensesubscription) throw new ApiError("License not found", 404);

      return res
        .status(200)
        .json(ApiResponse("licensesubscription updated successfully"));
    } catch (e) {
      console.log(e);
    }
  },
  deleteLicenseSubscription: async (req, res, next) => {
    try {
      const { licensesubscriptionId } = req.params;
      await LicenseSubscription.destroy({
        where: { id: licensesubscriptionId },
      });
      return res
        .status(200)
        .json(ApiResponse("LicenseSubscription updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllLicenseSubscription: async (req, res, next) => {
    try {
      const licensesubscriptions = await LicenseSubscription.findAll({
        include: [{
          model: User,
          include: [
            { model: Role, as: "role" },
            { model: Department, as: "department" },
          ],
        },
      ],
    });
      console.log(licensesubscriptions);
      return res
        .status(200)
        .json(
          ApiResponse(
            "LicenseSubscription fetched successfully",
            "licensesubscriptions",
            licensesubscriptions
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  addSimcards: async (req, res, next) => {
    try {
      const simcards = await Simcards.create({ ...req.body });
      if (!simcards) throw ApiError("Error creating asset", 400);

      return res.status(201).json(ApiResponse("Asset created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  editSimcards: async (req, res, next) => {
    try {
      const { simcardsId } = req.params;

      const simcards = await Simcards.findOne({
        where: { id: simcardsId },
      });
      if (!simcards) throw new ApiError("simcards not found", 404);

      return res.status(200).json(ApiResponse("simcards updated successfully"));
    } catch (e) {
      console.log(e);
    }
  },
  deleteSimcards: async (req, res, next) => {
    try {
      const { simcardsId } = req.params;
      await Simcards.destroy({
        where: { id: simcardsId },
      });
      return res.status(200).json(ApiResponse("Simcards updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllSimcards: async (req, res, next) => {
    try {
      const simcards = await Simcards.findAll({ include: [{
        model: User,
        include: [
          { model: Role, as: "role" },
          { model: Department, as: "department" },
        ],
      },
    ],
  });

      console.log(simcards);
      return res
        .status(200)
        .json(
          ApiResponse("Simcards fetched successfully", "simcards", simcards)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};

module.exports = assetManagementController;
