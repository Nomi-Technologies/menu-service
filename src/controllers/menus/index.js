const bulkCreateDish = require('./bulkCreateDish.js');
const bulkDeleteDish = require('./bulkDeleteDish.js');
const createMenu = require('./createMenu.js');
const deleteMenu = require('./deleteMenu.js');
const duplicateMenu = require('./duplicateMenu.js');
const favoriteMenu = require('./favoriteMenu.js');
const getAllMenus = require('./getAllMenus.js');
const getMenu = require('./getMenu.js');
const getMenuAsCSV = require('./getMenuAsCSV.js');
const setPublished = require('./setPublished.js');
const toggleFiltering = require('./toggleFiltering.js');
const updateCategoryOrder = require('./updateCategoryOrder.js');
const updateDishOrder = require('./updateDishOrder.js');
const updateMenu = require('./updateMenu.js');
const updateMenuOrder = require('./updateMenuOrder.js');
const uploadMenuCSV = require('./uploadMenuCSV.js');

module.exports = {
  bulkCreateDish,
  bulkDeleteDish,
  createMenu,
  deleteMenu,
  duplicateMenu,
  favoriteMenu,
  getAllMenus,
  getMenu,
  getMenuAsCSV,
  setPublished,
  toggleFiltering,
  updateCategoryOrder,
  updateDishOrder,
  updateMenu,
  updateMenuOrder,
  uploadMenuCSV,
};
