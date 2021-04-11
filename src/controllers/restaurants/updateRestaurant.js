const restaurantLogic = require('../../logic/restaurants');
const logger = require('../../utils/logger');

async function updateRestaurant(req, res) {
  const { restaurantId } = req.params;
  const newDetails = req.body;

  try {
    const restaurant = await restaurantLogic.getRestaurantById(restaurantId);
    const restaurantUpdated = await restaurantLogic.updateRestaurant(restaurant, newDetails);
    res.status(200).send({
      message: 'update sucessful',
      restaurant: restaurantUpdated,
    });
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: `An error occured while updating restaurant with restaurant_id=${restaurantId}`,
    });
  }
}

module.exports = updateRestaurant;
