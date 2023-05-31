"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      { schema: "wms", tableName: "roles" },
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID
        },
        roleName: {
          type: DataTypes.STRING
        },
        roleDesc: {
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
      }
    ),
      {
        schema: "wms",
        tableName: "roles"
      };
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable({ schema: "wms", tableName: "roles" });
  }
};
