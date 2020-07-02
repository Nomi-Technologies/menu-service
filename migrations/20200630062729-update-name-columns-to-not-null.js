module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.changeColumn("users", "firstname", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("users", "lastname", {
        type: Sequelize.STRING,
        allowNull: false,
      })
    );
  },

  down: (queryInterface, Sequelize) => {
    return (
      queryInterface.changeColumn("users", "firstname", {
        type: Sequelize.STRING,
      }),
      queryInterface.changeColumn("users", "lastname", {
        type: Sequelize.STRING,
      })
    );
  },
};
