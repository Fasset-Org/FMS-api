"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable ({ schema: "wms", tableName: "devices" },
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ schema: "wms", tableName: "devices" });
  },
};
