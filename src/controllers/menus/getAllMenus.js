const menuLogic = require('../../logic/menus');

async function getAllMenus(req, res) {
  const userRestaurantId = req.user.restaurantId;

  try {
    const data = await menuLogic.getAllMenusByRestaurantId(userRestaurantId);
    res.send(data);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting menus list',
    });
  }
}

module.exports = getAllMenus;
