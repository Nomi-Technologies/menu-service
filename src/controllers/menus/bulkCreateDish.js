const menuLogic = require('../../logic/menus');
const dishLogic = require('../../logic/menus');
const { getOrCreateCategory } = require("../../util/csv-parser");

async function bulkCreateDish(req, res) {
  let ids = req.body.ids;

  const menuData = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    published: true,
  };

  menuLogic.createMenu(menuData).then(async (menu) => {
    return new Promise(async (resolve, reject) => {
      try {
        for(let i = 0; i < ids.length; i++) {
          let id = ids[i];
          let originalDish = await dishLogic.getDishById(id);
          let categoryId = await getOrCreateCategory(originalDish.Category.name, menu.id)
          const dishData = {
            name: originalDish.name,
            description: originalDish.description,
            addons: originalDish.addons,
            canRemove: originalDish.canRemove,
            notes: originalDish.notes,
            tableTalkPoints: originalDish.tableTalkPoints,
            restaurantId: originalDish.restaurantId,
            categoryId: categoryId,
            menuId: menu.id,
            price: originalDish.price,
          };

          tagIds = [];
          originalDish.Tags.forEach((tag) => {
            tagIds.push(tag.id);
          });

          let dish = await dishLogic.createDish(categoryId, dishData)
          await dish.setTags(tagIds)
        }
        resolve(menu);
      } catch (error) {
        await menu.destroy()
        reject(error)
      }

    })
  }).then((menu) => {
    res.send(menu);
  }).catch(_ => {
    res.status(500).send({
      message: 'There was an error creating a new menu with selected dishes'
    })
  })
};

module.exports = bulkCreateDish;
