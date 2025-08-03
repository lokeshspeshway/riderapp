module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Leave", {
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    reason: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    }
  });
};
