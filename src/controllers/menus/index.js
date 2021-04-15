const bulkCreateDish = require('./bulkCreateDish.js');
const bulkDeleteDish = require('./bulkDeleteDish.js');
const createMenu = require('./createMenu.js');
const deleteMenu = require('./deleteMenu.js');
const duplicateMenu = require('./duplicateMenu.js');
const favoriteMenu = require('./favoriteMenu.js');
const getAllMenus = require('./getAllMenus.js');
const getMenu = require('./getMenu.js');
const getMenuAsCSV = require('./getMenuAsCSV.js');
const toggleFiltering = require('./toggleFiltering.js');
const updateCategoryOrder = require('./updateCategoryOrder.js');
const updateDishOrder = require('./updateDishOrder.js');
const updateMenu = require('./updateMenu.js');
const uploadMenuCSV = require('./uploadMenuCSV.js');
const setPublished = require('./setPublished.js');

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
  toggleFiltering,
  updateCategoryOrder,
  updateDishOrder,
  updateMenu,
  uploadMenuCSV,
  setPublished,
};
