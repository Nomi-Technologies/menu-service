const { Menu } = require('../../models');

async function getMenuById(id) {
  return Menu.findByPk(req.params.id);
}

module.exports = getMenuById;
