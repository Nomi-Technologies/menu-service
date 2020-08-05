'use strict';
const { Tag } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await Tag.create({
      name: "Gluten",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Treenuts",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Egg",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Soy",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Shellfish",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Fish",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Seeds",
      type: "allergen",
      excludeForFilter: true,
    });  
    await Tag.create({
      name: "Sesame",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Garlic",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Onion",
      type: "allergen",
      excludeForFilter: true,
    });
    await Tag.create({
      name: "Cilantro",
      type: "allergen",
      excludeForFilter: true,
    });    
    return Tag.create({
      name: "Truffle",
      type: "allergen",
      excludeForFilter: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Tags', null, {});
  }
};
