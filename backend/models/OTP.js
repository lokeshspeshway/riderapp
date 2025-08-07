module.exports = (sequelize, DataTypes) => {
  const OTP = sequelize.define("OTP", {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return OTP;
};
