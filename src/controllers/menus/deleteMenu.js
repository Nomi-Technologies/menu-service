const menuLogic = require('../../logic/menu');

async function deleteMenu(req, res) {
  const userRestaurantId = req.user.restaurantId;
  const menuId = req.params.id
  
  try {
    const menu = menuLogic.getMenuById(menuId);
    if (menu && menu.restaurantId == userRestaurantId) {
      await menuLogic.deleteMenuById(menuId);
      res.send({
        message: 'menu was deleted successfully',
      });
    }
    else {
      // sends if menu does not exist, or user does not have access
      res.status(404).send({
        message: 'Could not find menu to update',
      });
    }
  }
  catch(err) {
    res.status(500).send({
      message:
        err.message ||
        `An error occured while updating menu with id=${menuId}`,
    });
  }
};

module.exports = deleteMenu;
