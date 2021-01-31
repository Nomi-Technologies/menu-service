const { v4: uuidv4 } = require('uuid');
const { Menu } = require('../../models');

async function createTestMenu(menu) {
    return Menu.create(menu);
}

async function deleteTestMenu(menu) {
    return menu.destroy();
}

async function deleteTestMenuById(menuId) {
    // WARNING: deletes every matching entry
    return Menu.destroy({
        where: {
            id: menuId,
        }
    });
}

function generateTestMenuData(menu={}) {
    const testMenu = {
        id: uuidv4(),
        name: menu.name || Math.random().toString(),
        restaurantId: menu.restaurantId || uuidv4(),
        enableFiltering: menu.enableFiltering || true,
        published: menu.published || false,
    };
    return testMenu;
}

module.exports = {
    createTestMenu,
    deleteTestMenu,
    deleteTestMenuById,
    generateTestMenuData,
}
