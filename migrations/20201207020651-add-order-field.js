'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Dish', 'index', {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0
        }, { transaction: t }),
        queryInterface.addColumn('Category', 'index', {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0
        }, { transaction: t }),
      ]);
    });
     
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Dish', 'index', {transaction: t}),
        queryInterface.removeColumn('Category', 'index', {transaction: t})
      ]);
    });
  }
};
