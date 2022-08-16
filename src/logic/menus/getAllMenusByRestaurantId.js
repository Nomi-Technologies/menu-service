const { Menu } = require('../../models');

async function getAllMenusByRestaurantId(userRestaurantId) {
  return Menu.findAll({
    where: {
      restaurantId: userRestaurantId,
    },
    order: [['index', 'ASC']],
  });
}

module.exports = getAllMenusByRestaurantId;
