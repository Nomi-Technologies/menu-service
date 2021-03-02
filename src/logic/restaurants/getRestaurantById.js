const { Restaurant } = require('../../models');

async function getRestaurantById(id) {
  return Restaurant.findByPk(id);
}

module.exports = getRestaurantById;
