"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Device.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      deviceName: {
        type: DataTypes.TEXT,
        //allowNull: false
      },
      deviceType: {
        type: DataTypes.TEXT,
        //allowNull: false
      },
      serialNumberImei: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      warranty: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      assetTag: {
        type: DataTypes.TEXT,
        //allowNull: false,
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
      schema: "wms",
      tableName: "devices",
      timestamps: true,
    }
  );
  return Device;
};
