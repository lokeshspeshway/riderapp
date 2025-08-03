module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define("Wallet", {
    userId: DataTypes.INTEGER,
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  });
  return Wallet;
};
