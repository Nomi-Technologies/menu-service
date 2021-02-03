const { Menu } = require('../../models');

async function createMenu(menuData) {
  return Menu.create(menuData);
}

module.exports = createMenu;
