module.exports = (sequelize, DataTypes) => {
  const OTP = sequelize.define("OTP", {
    phone: DataTypes.STRING,
    code: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  });
  return OTP;
};
module.exports = (sequelize, DataTypes) => {
  const OTP = sequelize.define("OTP", {
    phone: DataTypes.STRING,
    code: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  });
  return OTP;
};
