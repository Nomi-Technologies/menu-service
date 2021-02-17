const { Menu } = require('../../models');

async function updateMenuById(body, id) {
  return Menu.update(body, { where: { id: id } });
}

module.exports = updateMenuById;
