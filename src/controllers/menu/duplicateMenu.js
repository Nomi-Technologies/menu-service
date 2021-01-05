const menuLogic = require('../../logic/menu');

async function duplicateMenu(req, res) {
  let userRestaurantId = req.user.restaurantId;
  menuLogic.getMenuWithCategoryById(req.params.id)
  .then((oldMenu) => {
    // verify user belongs to restauraunt of menu to update
    if (oldMenu && oldMenu.dataValues.restaurantId == userRestaurantId) {
      menuLogic.createMenu({
        name: oldMenu.dataValues.name + ' Copy',
        restaurantId: req.user.restaurantId,
        published: true
      }).then((newMenu) => {
          //duplicate all categories with menuId = menu.dataValues.id, use new menuId
          menuLogic.duplicateCategoriesAndDishes(oldMenu, newMenu)
          .then(() => {
            res.send({
              message: "menu was duplicated successfully",
              menu: {
                id: newMenu.dataValues.id
              }
            })
          })
      })
    }
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        "An error occured while duplicating menu",
    });
  });
};

module.exports = duplicateMenu;
