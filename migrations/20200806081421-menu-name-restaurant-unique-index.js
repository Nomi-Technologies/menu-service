'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Menus', 
      ['name', 'restaurantId'],
      { name: 'UniqueMenuNameIndex', unique: true },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Menus', 'UniqueMenuNameIndex');
  }
};
