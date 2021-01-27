const getDishById = require('./getRestaurantById');

async function updateDishtById(dishId, newDetails) {
  getDishById(dishId)
  .then((dish) => {
    // verify user belongs to restauraunt of dish to update
    return dish.update(newDetails)
  });
};

module.exports = updateDishtById;