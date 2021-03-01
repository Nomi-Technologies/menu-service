'use strict';
const { User, Restaurant, Menu, Dish, Category, Tag, Modification, Diet } = require('../src/models');

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
  
      const gluten = await Tag.findByName("gluten")
      const sesame = await Tag.findByName("sesame")
      const treenuts = await Tag.findByName("treenuts")
      const egg = await Tag.findByName("egg")
      const vegan = await Diet.findOne({ where: { name: "vegan" }});
  
      let dishData = {
        name: "Calamari",
        restaurantId: restaurant.id,
        categoryId: apps.id,
        price: '10',
      }
  
      await Dish.create(dishData).then(dish => dish.setTags([treenuts.id]));
  
      dishData = {
        name: "Hamburger",
        description: "Very juicy",
        restaurantId: restaurant.id,
        categoryId: entrees.id,
        price: '5',
      }
  
      const hamburger = await Dish.create(dishData)
      await hamburger.setTags([sesame, gluten, egg])
      let addMeatMod = await Modification.create({
        restaurantId: restaurant.id,
        name: "Add Meat",
        description: "Adds more meat",
        price: "2",
      })
      await hamburger.addModification(addMeatMod);
      let mod = await Modification.create({
        restaurantId: restaurant.id,
        name: "Remove cheese",
        description: "Removes the cheese",
        price: "0",
      })
      await mod.setTags([egg.id], { through: { addToDish: false } });
      await hamburger.addModification(mod)

      const salad = await Dish.create({
        name: "Salad",
        description: "Very vegan",
        restaurantId: restaurant.id,
        categoryId: entrees.id,
        price: '3',
      });
      salad.setTags([sesame]);
      salad.setDiets([vegan]);
      
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
    
      await Dish.create({
        name: "Pinot Noir",
        description: "crispy",
        restaurantId: restaurant.id,
        categoryId: Wine.id
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction().then(async t => {
      await Restaurant.destroy({ where: { uniqueName: "test-restaurant" }});
    });
  }
};
