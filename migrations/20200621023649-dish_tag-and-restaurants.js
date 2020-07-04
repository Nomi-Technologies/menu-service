'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'dish_tags',
        'removable',
        { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        { transaction }
      );
      await queryInterface.addColumn(
        'restaurants',
        'uniqueName',
        { type: Sequelize.STRING, /*unique: true,*/ allowNull: false, defaultValue: 'slug' },
        { transaction }
      );
      // await queryInterface.addIndex(
      //   'restaurants',
      //   ['uniqueName'],
      //   { indicesType: 'UNIQUE' },
      //   { transaction }
      // );
      await queryInterface.addColumn(
        'restaurants',
        'published',
        { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        { transaction }
      );
      await transaction.commit();
      return Promise.resolve();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      return Promise.reject(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('dish_tags', 'removable');
      await queryInterface.removeColumn('restaurants', 'uniqueName');
      await queryInterface.removeColumn('restaurants', 'published');
      await transaction.commit();
      return Promise.resolve();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      return Promise.reject(err);
    }
  }
};
