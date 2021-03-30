const dishLogic = require('../../logic/dishes');
const logger = require('../../utils/logger');

async function getDishesByName(req, res) {
  const userRestaurantId = req.user.restaurantId;
  const searchValue = `%${req.query.searchInput}%`;
  const { menuId } = req.query;

  try {
    const dishesByName = await dishLogic.getDishesByName(userRestaurantId, menuId, searchValue);
    res.send(dishesByName);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while searching for dish',
    });
  }
}

module.exports = getDishesByName;
