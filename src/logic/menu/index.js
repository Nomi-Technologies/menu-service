const createMenu = require("./createMenu.js");
const destroyMenuById = require("./destroyMenuById.js");
const duplicateCategoriesAndDishes = require("./duplicateCategoriesAndDishes.js");
const getDishById = require("./getDishById.js");
const getMenuById = require("./getMenuById.js");
const getMenuByIdAndRestaurantId = require("./getMenuByIdAndRestaurantId.js");
const getMenuWithCategoryById = require("./getMenuWithCategoryById.js");
const getMenuWithCategoryByIdOrdered = require("./getMenuWithCategoryByIdOrdered.js");
const updateMenuById = require("./updateMenuById.js");

module.exports = {
  createMenu,
  destroyMenuById,
  duplicateCategoriesAndDishes,
  getDishById,
  getMenuById,
  getMenuByIdAndRestaurantId,
  getMenuWithCategoryById,
  getMenuWithCategoryByIdOrdered,
  updateMenuById,
}
