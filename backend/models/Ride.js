module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define("Ride", {
    riderId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    pickupLocation: DataTypes.STRING,
    dropLocation: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'requested'
    },
    fare: DataTypes.FLOAT,
    estimatedTime: DataTypes.STRING,
    vehicleType: DataTypes.STRING,
    surgeMultiplier: { type: DataTypes.FLOAT, defaultValue: 1.0 }
  });
  return Ride;
};
