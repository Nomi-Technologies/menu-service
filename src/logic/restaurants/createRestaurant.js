const slug = require('slug');
const { Restaurant } = require('../../models');

async function createRestaurant(restaurant) {
  const uniqueNameBase = slug(restaurant.name);
  let uniqueName = uniqueNameBase;
  let retries = 0;
  let collision = await Restaurant.findAll({
    where: { uniqueName },
  });
  while (collision.length > 0) {
    uniqueName = `${uniqueNameBase}-${++retries}`;
    collision = await Restaurant.findAll({ where: { uniqueName } });
  }

  restaurant.uniqueName = uniqueName;
  restaurant.published = true; // temp until we set up publishing

  return Restaurant.create(restaurant);
}

module.exports = createRestaurant;
