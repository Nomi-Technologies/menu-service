/* eslint-disable linebreak-style */
const createMenu = require('./createMenu.js');
const deleteMenuById = require('./deleteMenuById.js');
const duplicateCategoriesAndDishes = require('./duplicateCategoriesAndDishes.js');
const getAllMenusByRestaurantId = require('./getAllMenusByRestaurantId.js');
const getMenuById = require('./getMenuById.js');
const getMenuByIdAndRestaurantId = require('./getMenuByIdAndRestaurantId.js');
const getMenuWithCategoryById = require('./getMenuWithCategoryById.js');
const getMenuWithCategoryByIdOrdered = require('./getMenuWithCategoryByIdOrdered.js');
const updateMenuById = require('./updateMenuById.js');

module.exports = {
  createMenu,
  deleteMenuById,
  duplicateCategoriesAndDishes,
  getAllMenusByRestaurantId,
  getMenuById,
  getMenuByIdAndRestaurantId,
  getMenuWithCategoryById,
  getMenuWithCategoryByIdOrdered,
  updateMenuById,
};
