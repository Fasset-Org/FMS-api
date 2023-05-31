"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "departments" },
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        departmentName: {
          type: DataTypes.TEXT
        },
        departmentDesc: {
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
        schema: "wms",
        tableName: "departments"
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ schema: "wms", tableName: "departments" });
  }
};
