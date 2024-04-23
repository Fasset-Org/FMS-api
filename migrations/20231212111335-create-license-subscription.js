'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable({tableName: 'licensesubscriptions', schema: 'wms'}, {
      id: {
        allowNull: false,
        
        primaryKey: true,
        type: DataTypes.UUID,
      },
      productName: {
        type: DataTypes.STRING
      },
      licenseSubscriptionType:{
        type: DataTypes.TEXT,
        //allowNull: false,

      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      licenseKeySubscriptionCode: {
        type: DataTypes.STRING,
      },
     
      usageLimits: {
        type: DataTypes.STRING,
      },
      renewalStatus: {
        type: DataTypes.STRING,
        //allowNull:false,
      },
      vendorProvider: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable({tableName: 'licensesubscriptions', schema: 'wms'});
  }
};