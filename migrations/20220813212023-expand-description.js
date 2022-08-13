'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Dish', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Dish', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
