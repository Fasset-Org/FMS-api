"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Department, Role, UserModule }) {
      // define association here
      this.hasOne(Department, {
        foreignKey: "departmentId",
        onDelete: "CASCADE",
        hooks: true
      });

      this.hasOne(Role, {
        foreignKey: "roleId",
        onDelete: "CASCADE",
        hooks: true
      });

      this.belongsTo(UserModule, {
        foreignKey: "userId"
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      fullName: {
        type: DataTypes.STRING
      },
      userName: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          min: {
            args: [10],
            msg: "Minimum 10 characters required for password"
          }
        }
      },
      departmentId: {
        type: DataTypes.UUID
      },
      roleId: {
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: "User",
      schema: "wms",
      timestamps: true,
      tableName: "users",
      updatedAt: "dateUpdated",
      createdAt: "dateCreated"
    }
  );
  return User;
};