module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vendorProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      agency_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agency_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_specification: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('vendorProfiles'),
};
