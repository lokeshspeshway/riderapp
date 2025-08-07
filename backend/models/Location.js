const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Location = sequelize.define('Location', {
  pickupName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pickupLatitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  pickupLongitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  dropName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dropLatitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  dropLongitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
});

module.exports = Location;
