const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all models here
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.OTP = require('./OTP')(sequelize, Sequelize.DataTypes);
db.Vehicle = require('./Vehicle')(sequelize, Sequelize.DataTypes);
db.DriverProfile = require('./DriverProfile')(sequelize, Sequelize.DataTypes);
db.Ride = require('./Ride')(sequelize, Sequelize.DataTypes);
db.Location = require('./Location')(sequelize, Sequelize.DataTypes);

// Associations (after models are defined)
db.Vehicle.belongsTo(db.User, { foreignKey: 'driverId' });
db.DriverProfile.belongsTo(db.User, { foreignKey: 'userId' });
db.Ride.belongsTo(db.User, { as: 'rider', foreignKey: 'riderId' });
db.Ride.belongsTo(db.User, { as: 'driver', foreignKey: 'driverId' });

module.exports = db;
