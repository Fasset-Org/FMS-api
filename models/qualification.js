"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Qualification.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      qualificationName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      qualificationLevel: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "Qualification",
      schema: "wms"
    }
  );
  return Qualification;
};
