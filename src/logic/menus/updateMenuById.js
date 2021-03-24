const { Menu } = require('../../models');

async function updateMenuById(body, id) {
  return Menu.update(body, { where: { id } });
}

module.exports = updateMenuById;
