'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Simcards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association heres
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Simcards.init({
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
    }
    ,
    solutionID: {
      type: DataTypes.STRING,
    },
    simcardType: {
      type: DataTypes.STRING,

    },
    startDate:{
      type: DataTypes.DATE,
      //allowNull: false,
    },
    endDate:{
      type: DataTypes.DATE,
      //allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    createdAt:{
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt:{
      allowNull: false,
      type:DataTypes.DATE,
    }
    
  }, {
    sequelize,
    modelName: 'Simcards',
    schema: 'wms',
    tableName: 'simcards',
    timestamps: true
  });
  return Simcards;
};