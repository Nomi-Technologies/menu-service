const { Menu } = require('../../models');

async function updateMenuOrder(menu, t) {
  return Menu.update({ index: menu.index },
    { 
      where: { id: menu.id },
      transaction: t,
    },
  );
}

module.exports = updateMenuOrder;
