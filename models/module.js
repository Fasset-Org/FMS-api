"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserModule }) {
      // define association here
      this.hasMany(UserModule, {
        foreignKey: "userId"
      });
    }
  }
  Module.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID
      },
      moduleName: {
        type: DataTypes.TEXT
      },
      moduleDesc: {
        type: DataTypes.TEXT
      },
      dateCreated: {
        allowNull: false,
        type: DataTypes.DATE
      },
      dateUpdated: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "Module",
      tableName: "modules",
      timestamps: true,
      schema: "wms",
      updatedAt: "dateUpdated",
      createdAt: "dateCreated"
    }
  );
  return Module;
};
