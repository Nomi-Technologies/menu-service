const { Menu } = require('../../models');

async function destroyMenuById(id) {
  Menu.destroy({ where: {id: id} });
}

module.exports = destroyMenuById;
