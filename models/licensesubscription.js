'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LicenseSubscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  LicenseSubscription.init({
    id: {
      
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    productName: {
      type: DataTypes.STRING,
    },
    licenseSubscriptionType:{
      type: DataTypes.TEXT,
      //allowNull: false,

    },
   
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull:  false,
    },
    licenseKeySubscriptionCode: {
      type: DataTypes.STRING,
    },
   
    usageLimits: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    renewalStatus: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    vendorProvider: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt:{
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt:{
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: "LicenseSubscription",
    schema: 'wms',
    tableName: 'licensesubscriptions',
    timestamps: true
  
  });
  return LicenseSubscription;
};