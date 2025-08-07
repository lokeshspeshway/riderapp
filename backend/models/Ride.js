
module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define("Ride", {
    riderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: DataTypes.INTEGER,
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dropLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'requested',
    },
    fare: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { min: 0 }
    },
    estimatedTime: DataTypes.STRING,
    vehicleType: DataTypes.STRING,
    surgeMultiplier: { type: DataTypes.FLOAT, defaultValue: 1.0 }
  });

  return Ride;
};
