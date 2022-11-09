const logger = require('../../utils/logger');
const restaurantLogic = require('../../logic/restaurants');

module.exports = {
  async redirect(req, res) {
    console.log(req.query);
    let restaurant;
    try {
      restaurant = await restaurantLogic.getRestaurantById(req.query.restoId);
    }
    catch(e) {
      logger.warn(`${req.query.restoId} not found in db`);
    }
    const slug = restaurant?.uniqueName ?? '';
    res.redirect(302, `https://nomi.menu/${slug}${restaurant ? `?menuId=${req.query.menuId}` : ''}`);
  },
};
