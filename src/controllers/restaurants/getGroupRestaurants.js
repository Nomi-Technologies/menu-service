const restaurantLogic = require('../../logic/restaurants');
const logger = require('../../utils/logger');

async function getGroupRestaurants(req, res) {
  const { groupId } = req.params;

  try {
    const data = await restaurantLogic.getAllRestaurantsByGroupId(groupId);
    res.send(data);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting restaurants list',
    });
  }
}

module.exports = getGroupRestaurants;
