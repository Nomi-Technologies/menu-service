const { Menu } = require('../../models');

async function getAllMenusByRestaurantId(userRestaurantId) {
    return Menu.findAll({
        where: { 
            restaurantId: userRestaurantId, 
        }
    });
}

module.exports = getAllMenusByRestaurantId;
