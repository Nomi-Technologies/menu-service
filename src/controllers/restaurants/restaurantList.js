const restaurantLogic = require('../../logic/restaurants');
const logger = require('../../utils/logger');

async function restaurantList(req, res) {
  const { groupId } = req.user;

  try {
    const restaurants = restaurantLogic.restaurantList(groupId);
    res.send(restaurants);
  }
  catch(error) {
    logger.error(error);
    res.status(500).send({
      message: 'there was an error getting the restaurant list',
    });
  }
}

module.exports = restaurantList;
