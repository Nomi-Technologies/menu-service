const getRestaurantById = require('./getRestaurantById');

async function updateRestaurantById(restaurantId, newDetails) {
  const restaurant = await getRestaurantById(restaurantId);
  if (restaurant) {
    await restaurant.update(newDetails);
  }
}

module.exports = updateRestaurantById;
