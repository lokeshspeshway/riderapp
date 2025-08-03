module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    phone: { type: DataTypes.STRING, unique: true },
    role: DataTypes.ENUM("rider", "driver", "admin"),
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
  return User;
};
