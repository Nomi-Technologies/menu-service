const { Restaurant } = require('../../models');

async function getAllRestaurantsByGroupId(groupId) {
  return Restaurant.findAll({
    where: {
      groupId,
    },
  });
}

module.exports = getAllRestaurantsByGroupId;
