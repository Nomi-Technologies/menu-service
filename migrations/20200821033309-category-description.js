'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Categories', 'description', { type: Sequelize.DataTypes.TEXT });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Categories', 'description');
  }
};
