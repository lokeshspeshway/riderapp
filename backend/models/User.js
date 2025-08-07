module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("rider", "driver", "admin"),
      allowNull: false,
      defaultValue: "rider",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};