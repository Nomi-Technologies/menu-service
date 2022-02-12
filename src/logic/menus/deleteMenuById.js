/* eslint-disable linebreak-style */
const { Menu } = require('../../models');

async function deleteMenuById(id) {
  Menu.destroy({ where: { id } });
}

module.exports = deleteMenuById;
