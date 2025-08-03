module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define("Document", {
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING, // e.g. 'Aadhar', 'DL', 'PAN'
    filePath: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    }
  });
  return Document;
};
