const restaurantLogic = require('../../logic/restaurants');
const logger = require('../../utils/logger');

// gets restaurant information based on authentication
async function getRestaurant(req, res) {
  const { restaurantId } = req.params;

  try {
    const restaurant = await restaurantLogic.getRestaurantById(restaurantId);
    res.send(restaurant);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting restaurant with restaurant_id=${restaurantId}`,
    });
  }
}

module.exports = getRestaurant;
