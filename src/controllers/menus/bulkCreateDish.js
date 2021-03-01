const menuLogic = require('../../logic/menus');
const dishLogic = require('../../logic/dishes');
const { getOrCreateCategory } = require('../../util/csv-parser');

async function bulkCreateDish(req, res) {
  const { ids } = req.body;
  const menuData = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    published: true,
  };
  let menu;

  try {
    menu = await menuLogic.createMenu(menuData);
    ids.forEach(async (id) => {
      const originalDish = await dishLogic.getDishById(id);
      const categoryId = await getOrCreateCategory(originalDish.Category.name, menu.id);

      const dishData = {
        name: originalDish.name,
        description: originalDish.description,
        addons: originalDish.addons,
        canRemove: originalDish.canRemove,
        notes: originalDish.notes,
        tableTalkPoints: originalDish.tableTalkPoints,
        restaurantId: originalDish.restaurantId,
        categoryId,
        menuId: menu.id,
        price: originalDish.price,
      };

      const tagIds = [];
      originalDish.Tags.forEach((tag) => {
        tagIds.push(tag.id);
      });

      const dietIds = [];
      originalDish.Diets.forEach((diet) => {
        dietIds.push(diet.id);
      });

      const dish = await dishLogic.createDish(categoryId, dishData);
      await dish.setTags(tagIds);
      await dish.setDiets(dietIds);
    });
    res.send(menu);
  }
  catch(err) {
    await menu.destroy();
    res.status(500).send({
      message: 'There was an error creating a new menu with selected dishes',
    });
  }
}

module.exports = bulkCreateDish;
