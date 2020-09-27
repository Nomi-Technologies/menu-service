'use strict';
const { User, Restaurant, Menu, Dish, Category, Tag } = require('../models');

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
        1,
        restaurant.id,
        "John",
        "Doe"
      )
  
      let menu = await Menu.create({
        name: "Dinner",
        restaurantId: restaurant.id,
        published: true,
      });      
  
      let apps = await Category.create({
        name: "Appetizers",
        description: "Small plates to start with",
        menuId: menu.id
      })

      let entrees = await Category.create({
        name: "Entrees",
        description: "The main event",
        menuId: menu.id
      })
  
      const gluten = await Tag.findOne({where: { name: "Gluten" }});
      const sesame = await Tag.findOne({where: { name: "Sesame" }});
      const treenuts = await Tag.findOne({where: { name: "Treenuts" }});
  
      let dishData = {
        name: "Calamari",
        restaurantId: restaurant.id,
        categoryId: apps.id,
        price: '$10',
      }
  
      await Dish.create(dishData).then(dish => dish.setTags([treenuts]));
  
      dishData = {
        name: "Hamburger",
        description: "Very juicy",
        restaurantId: restaurant.id,
        categoryId: entrees.id
      }
  
      await Dish.create(dishData).then(dish => dish.setTags([sesame, gluten]));
  
      menu = await Menu.create({
        name: "Drinks",
        restaurantId: restaurant.id,
        published: true
      })
    
    
      let Wine = await Category.create({
        name: "Wine",
        description: "This stuff is made from grapes!",
        menuId: menu.id
      })
    
      let Beer = await Category.create({
        name: "Beer",
        menuId: menu.id
      })
    
      await Dish.create({
        name: "Corona",
        description: "yike",
        restaurantId: restaurant.id,
        categoryId: Beer.id
      })
    
      await Dish.create({
        name: "Coors Lite",
        description: "crispy",
        restaurantId: restaurant.id,
        categoryId: Beer.id
      })
    
    
      await Dish.create({
        name: "Malbec",
        description: "yike",
        restaurantId: restaurant.id,
        categoryId: Wine.id
      })
    
      return Dish.create({
        name: "Pinot Noir",
        description: "crispy",
        restaurantId: restaurant.id,
        categoryId: Wine.id
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async t => {
      await queryInterface.bulkDelete('Restaurant', { 
        uniqueName: 'test-restaurant' 
      }, {});
      await queryInterface.bulkDelete('User', { 
        email: 'admin@test.com' 
      }, {});
    });
  }
};
