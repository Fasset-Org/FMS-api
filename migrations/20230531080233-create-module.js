"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "modules" },
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID
        },
        moduleName: {
          type: DataTypes.STRING
        },
        moduleDesc: {
          type: DataTypes.STRING
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
        tableName: "modules"
      }
    );
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable({ schema: "wms", tableName: "modules" });
  }
};
