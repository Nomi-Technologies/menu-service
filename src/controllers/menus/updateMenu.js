const menuLogic = require('../../logic/menus');

async function updateMenu(req, res) {
  const userRestaurantId = req.user.restaurantId;
  const menuId = req.params.id;
  const menuData = req.body;

  try {
    const menu = await menuLogic.getMenuById(menuId);
    if (menu && menu.restaurantId === userRestaurantId) {
      await menuLogic.updateMenuById(menuData, menuId);
      res.status(200).send({
        message: 'update sucessful',
      });
    }
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message
        || `An error occured while updating menu with id=${req.params.id}`,
    });
    console.error(err);
  }
}

module.exports = updateMenu;
