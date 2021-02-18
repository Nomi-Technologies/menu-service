'use strict';
const { Diet } = require('../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async transaction => {
      await Diet.create({ name: "vegetarian" });
      await Diet.create({ name: "vegan" });
      await Diet.create({ name: "keto" });
      await Diet.create({ name: "pescetarian" });
      transaction.commit();
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tag', { name: [
      "vegetarian",
      "vegan",
      "keto",
      "pescetarian",
    ]}, {});
  }
};