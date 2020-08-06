'use strict';
const { Tag } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async t => {
      await Tag.create({
        name: "Gluten",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Treenuts",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Egg",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Soy",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Shellfish",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Fish",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Seeds",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });  
      await Tag.create({
        name: "Sesame",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Garlic",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Onion",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
      await Tag.create({
        name: "Cilantro",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });    
      await Tag.create({
        name: "Truffle",
        type: "allergen",
        excludeForFilter: true,
      }, { transaction: t });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', { name: [
      "Gluten",
      "Treenuts",
      "Egg",
      "Shellfish",
      "Fish",
      "Seeds",
      "Sesame",
      "Garlic",
      "Onion",
      "Cilantro",
      "Truffle",
    ]}, {});
  }
};
