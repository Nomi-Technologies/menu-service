'use strict';
const { Redirect } = require('../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async transaction => {
      await Redirect.create({ id: "b7672eb4-cf63-41fc-aee9-b0f951245768", url: "https://nomi.menu/demo-restaurant" });
      await Redirect.create({ id: "4eeead78-49d8-430f-89d1-7a2cb394791e" });
      transaction.commit();
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Redirect', { id: [
      "b7672eb4-cf63-41fc-aee9-b0f951245768",
      "4eeead78-49d8-430f-89d1-7a2cb394791e",
    ]}, {});
  }
};