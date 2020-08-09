'use strict';
const { User, Restaurant, Menu, Dish, Category, MenuDish } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async t => {
      const restaurant = await Restaurant.create({
        uniqueName: "test-restaurant",
        name: "Test Restaurant",
        streetAddress: "2145 1st St",
        city: "Los Angeles",
        state: "CA",
        zip: "90007",
        phone: "1111111111",
        url: "google.com"
      });
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

      let apps = await Category.create({
        name: "Appetizers",
        menuId: menu.id
      })

      let entrees = await Category.create({
        name: "Entrees",
        menuId: menu.id
      })

      let dishData = {
        name: "Calamari",
        description: "So tasty",
        restaurantId: restaurant.id,
        categoryId: apps.id
      }

      await Dish.create(dishData);

      dishData = {
        name: "Hamburger",
        description: "Very juicy",
        restaurantId: restaurant.id,
        categoryId: entrees.id
      }

      await Dish.create(dishData);
      
      let menu2 = await Menu.create({
        name: "Drinks",
        restaurantId: restaurant.id,
        published: true
      });

      let drinks = await Category.create({
        name: "Drinks",
        menuId: menu2.id
      });

      await Dish.create({
        name: "Wine",
        description: "Very intoxicating",
        restaurantId: restaurant.id,
        categoryId: drinks.id
      });

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async t => {
      await queryInterface.bulkDelete('Restaurants', { 
        uniqueName: 'test-restaurant' 
      }, {});
      await queryInterface.bulkDelete('Users', { 
        email: 'admin@test.com' 
      }, {});
    });
  }
};
