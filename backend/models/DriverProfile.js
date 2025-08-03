module.exports = (sequelize, DataTypes) => {
  const DriverProfile = sequelize.define('DriverProfile', {
    userId: DataTypes.INTEGER,
    licenseNumber: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER,
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  return DriverProfile;
};
