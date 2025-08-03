module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    driverId: DataTypes.INTEGER,
    type: DataTypes.ENUM('compact', 'XL', 'premium'),
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    seats: DataTypes.INTEGER,
    trunkSize: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  });
  return Vehicle;
};
