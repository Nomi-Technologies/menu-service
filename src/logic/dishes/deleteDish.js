const { Dish } = require('../../models');

async function deleteDish(dish, userRestaurantId) {
  if (dish && dish.restaurantId == userRestaurantId) {
    await Dish.destroy({
      where: { id: dish.id },
    });
  }
}

module.exports = deleteDish;
