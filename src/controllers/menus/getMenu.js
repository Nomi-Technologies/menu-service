const menuLogic = require('../../logic/menus');

async function getMenu(req, res) {
  const { id } = req.params;
  const userRestaurantId = req.user.restaurantId;

  try {
    const menu = await menuLogic.getMenuByIdAndRestaurantId(id, userRestaurantId);
    if (menu) {
      res.send(menu);
    }
    else {
      res.status(404).send({
        message: 'Could not find menu',
      });
    }
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting menus list',
    });
  }
}

module.exports = getMenu;
