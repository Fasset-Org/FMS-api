'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable({tableName: 'simcards', schema: 'wms'}, {
      id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      simcardName: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.TEXT
      },
      solutionID: {
        type: DataTypes.STRING,
      },
      simcardType: {
        type: DataTypes.STRING,
  
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      startDate:{
        type: DataTypes.DATE,
      },
      endDate:{
        type: DataTypes.DATE
      },
      status:{
        type: DataTypes.STRING,
        allowNull:false,
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
    await queryInterface.dropTable({tableName: 'simcards', schema: 'wms'});
  }
};