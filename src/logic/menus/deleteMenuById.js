const { Menu } = require('../../models');

async function deleteMenuById(id) {
  Menu.destroy({ where: {id: id} });
}

module.exports = deleteMenuById;
