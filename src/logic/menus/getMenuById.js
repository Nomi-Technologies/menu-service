const { Menu } = require('../../models');

async function getMenuById(id) {
  return Menu.findByPk(id);
}

module.exports = getMenuById;
