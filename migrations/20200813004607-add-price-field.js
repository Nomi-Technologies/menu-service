'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Dishes', 'price', { type: Sequelize.DataTypes.STRING });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Dishes', 'price', { type: Sequelize.DataTypes.STRING });
  }
};
