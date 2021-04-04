const { Dish } = require('../../models');

async function deleteDish(dish) {
  if (dish) {
    await Dish.destroy({
      where: { id: dish.id },
    });
  }
}

module.exports = deleteDish;
