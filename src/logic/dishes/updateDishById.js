const getDishById = require('./getDishById');

async function updateDishtById(dishId, newDetails) {
  const dish = await getDishById(dishId);
  if (dish) {
    await dish.update(newDetails);
  }
}

module.exports = updateDishtById;
