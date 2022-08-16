'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Menu', 'index', {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      }
    );
     
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Menu', 'index');
  }
};
