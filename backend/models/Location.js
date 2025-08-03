module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    userId: DataTypes.INTEGER,
    role: DataTypes.ENUM('rider', 'driver'),
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  return Location;
};
