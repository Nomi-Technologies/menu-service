const getRestaurantById = require('./getRestaurantById');

async function updateRestaurantById(restaurantId, newDetails) {
  getRestaurantById(restaurantId)
    .then((restaurant) =>
    // verify user belongs to restauraunt of dish to update
      restaurant.update(newDetails));
}

module.exports = updateRestaurantById;
