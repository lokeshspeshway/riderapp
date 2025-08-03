module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Attendance", {
    userId: DataTypes.INTEGER,
    type: DataTypes.ENUM('clock_in', 'clock_out', 'break_start', 'break_end'),
    time: DataTypes.DATE,
    location: DataTypes.STRING
  });
};
