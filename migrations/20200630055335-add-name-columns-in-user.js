"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn("users", "firstname", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "lastname", {
        type: Sequelize.STRING,
      }),
      queryInterface.sequelize.query(
        "UPDATE users SET firstname='Jane' where id=3;"
      ),
      queryInterface.sequelize.query(
        "UPDATE users SET lastname='Doe' where id=3;"
      )
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
