'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn(
      'User',
      'groupId',
      {
        type: Sequelize.UUID
      }
    );

    queryInterface.addColumn(
      'Restaurant',
      'groupId',
      {
        type: Sequelize.UUID
      }
    )

    queryInterface.removeColumn('User', 'restaurantId')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('User', 'groupId');
    queryInterface.removeColumn('Restaurant', 'groupId');
    queryInterface.addColumn(
      'User',
      'restaurantId',
      {
        type: Sequelize.UUID
      }
    )
  }
};
