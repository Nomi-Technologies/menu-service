'use strict';
const { Diet } = require('../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async transaction => {
      await Diet.create({ name: "Vegetarian" });
      await Diet.create({ name: "Vegan" });
      await Diet.create({ name: "Keto" });
      await Diet.create({ name: "Pescetarian" });
      await Diet.create({ name: "Halal" });
      await Diet.create({ name: "Gluten Free" });
      transaction.commit();
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Diet', { name: [
      "Vegetarian",
      "Vegan",
      "Keto",
      "Pescetarian",
      "Halal",
      "Gluten Free",
    ]}, {});
  }
};