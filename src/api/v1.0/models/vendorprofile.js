module.exports = (sequelize, DataTypes) => {
  const vendorProfile = sequelize.define('vendorProfile', {
    agency_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agency_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return vendorProfile;
};
