'use strict';
const { User, Restaurant, Menu, Dish, Category } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */



    return Restaurant.create({
      uniqueName: "test-restaurant2",
      name: "Test Restaurant",
      streetAddress: "2145 1st St",
      city: "Los Angeles",
      state: "CA",
      zip: "90007",
      phone: "1111111111",
      url: "google.com"
    }).then(async (restaurant) => {
      console.log("creating user")
      await User.register(
        "admin@test.com",
        "password123",
        "2222222222",
        restaurant.id,
        1,
        "John",
        "Doe"
      )

      let menu = await Menu.create({
        name: "Fall 2020",
        restaurantId: restaurant.id,
        published: true
      });

      let category = await Category.create({
        name: "Appetizers",
        menuId: menu.id
      })

      let dishData = {
        name: "Test Dish",
        description: "test description",
        restaurantId: restaurant.id 
      }

      let dish = await Dish.create(dishData)
      await dish.setCategories([category.id])
      return dish.setTags([1, 3, 6])
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
