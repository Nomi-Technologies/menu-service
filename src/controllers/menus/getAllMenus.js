const menuLogic = require('../../logic/menus');
const logger = require('../../utils/logger');

async function getAllMenus(req, res) {
  const { restaurantId } = req.params;

  try {
    const data = await menuLogic.getAllMenusByRestaurantId(restaurantId);
    res.send(data);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting menus list',
    });
  }
}

module.exports = getAllMenus;
