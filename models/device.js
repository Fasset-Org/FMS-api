"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Device.init(
    {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: DataTypes.UUID,
      },

      DeviceName: {
        type: DataTypes.STRING,
      },

      DeviceType: {
        type: DataTypes.STRING,
      },

      SerialNumber: {
        type: DataTypes.INTEGER,
      },

      Warranty: {
        type: DataTypes.STRING,
      },

      AssignedTo: {
        type: DataTypes.STRING,
      },

      CurrentStatus: {
        type: DataTypes.STRING,
      },

      Remarks: {
        type: DataTypes.STRING,
      },

      Uploads: {
        type: DataTypes.STRING,
      },

      Disposal: {
        type: DataTypes.STRING,
      },

      UserId: {
        type: DataTypes.UUID,

        // allowNull: false,
      },

      createdAt: {
        allowNull: false,

        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,

        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Device",
      tableName: "devices",
      timestamps: true
    }
  );
  return Device;
};
