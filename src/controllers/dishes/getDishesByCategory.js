const dishLogic = require('../../logic/dishes');
const logger = require('../../utils/logger');

async function getDishesByCategory(req, res) {
  const userRestaurantId = req.user.restaurantId;

  try {
    const dishesByCategory = await dishLogic.getDishesByCategory(userRestaurantId);
    res.send(dishesByCategory);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting categories list',
    });
  }
}

module.exports = getDishesByCategory;
