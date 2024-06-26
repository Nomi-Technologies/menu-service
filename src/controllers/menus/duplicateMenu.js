const menuLogic = require('../../logic/menus');

async function duplicateMenu(req, res) {
  const userRestaurantId = req.user.restaurantId;
  const menuId = req.params.id;

  try {
    const oldMenu = await menuLogic.getMenuWithCategoryById(menuId);
    if (oldMenu && oldMenu.dataValues.restaurantId === userRestaurantId) {
      const menuData = {
        name: `${oldMenu.dataValues.name} Copy`,
        restaurantId: userRestaurantId,
        published: true,
      };
      const newMenu = await menuLogic.createMenu(menuData);
      await menuLogic.duplicateCategoriesAndDishes(oldMenu, newMenu);
      res.send({
        message: 'menu was duplicated successfully',
        menu: {
          id: newMenu.dataValues.id,
        },
      });
    }
    else {
      res.status(404).send({
        message: 'menu not found',
      });
    }
  }
  catch(err) {
    res.status(500).send({
      message:
        err.message
        || 'An error occured while duplicating menu',
    });
  }
}

module.exports = duplicateMenu;
