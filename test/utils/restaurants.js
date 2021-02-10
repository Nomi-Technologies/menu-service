const { v4: uuidv4 } = require('uuid');
const { Restaurant } = require('../../models');

async function createTestRestaurant(restaurant) {
  return Restaurant.create(restaurant);
}

async function deleteTestRestaurant(restaurant) {
  return restaurant.destroy();
}

async function deleteTestRestaurantById(restaurantId) {
  // WARNING: deletes every matching entry
  return Restaurant.destroy({
    where: {
      id: restaurantId,
    },
  });
}

function generateTestRestaurantData(restaurant = {}) {
  const testRestaurant = {
    id: uuidv4(),
    uniqueName: restaurant.uniqueName || Math.random().toString(),
    name: restaurant.name || Math.random().toString(),
    streetAddress: restaurant.streetAddress || Math.random().toString(),
    city: restaurant.city || Math.random().toString(),
    state: restaurant.state || Math.random().toString(),
    zip: restaurant.zip || Math.random().toString(),
    phone: restaurant.phone || Math.random().toString(),
    url: restaurant.url || Math.random().toString(),
  };
  return testRestaurant;
}

module.exports = {
  createTestRestaurant,
  deleteTestRestaurant,
  deleteTestRestaurantById,
  generateTestRestaurantData,
};
