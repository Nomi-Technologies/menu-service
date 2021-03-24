const { Dish } = require('../../models');

async function deleteDishById(dishId) {
  // WARNING: deletes every matching entry
  await Dish.destroy({
    where: { id: dishId },
  });
}

module.exports = deleteDishById;
