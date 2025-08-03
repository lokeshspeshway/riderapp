module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    rideId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    totalFare: DataTypes.FLOAT,
    baseFare: DataTypes.FLOAT,
    distanceFare: DataTypes.FLOAT,
    timeFare: DataTypes.FLOAT,
    surge: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    status: {
      type: DataTypes.ENUM('success', 'failed'),
      defaultValue: 'success'
    }
  });
  return Transaction;
};
