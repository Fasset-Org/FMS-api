'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable({tableName: 'devices', schema: 'wms'}, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      deviceName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      deviceType: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      serialNumberImei: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      warranty: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      assetTag:{
        type: DataTypes.TEXT,
        allowNull: false

      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      status: {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable({tableName: 'devices', schema: 'wms'});
  }
};