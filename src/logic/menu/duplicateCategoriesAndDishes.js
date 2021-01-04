const { createDish, createCategory } = require("../../util/menu")

async function duplicateCategoriesAndDishes(oldMenu, newMenu) {
  return new Promise((resolve, reject) => {
    if(oldMenu.Categories.length === 0) {
      resolve();
    }
    oldMenu.Categories.forEach(c => {
      createCategory(menuId, {
        name: c.dataValues.name,
        menuId: newMenu.dataValues.id,
        description: c.dataValues.description,
      }).then((cCopy) => {
        if(c.Dishes.length == 0) {
          resolve();
        }
        c.Dishes.forEach(d => {
          let dishInfo = {
            name: d.dataValues.name,
            description: d.dataValues.description,
            price: d.dataValues.price,
            categoryId: cCopy.dataValues.id,
            restaurantId: d.dataValues.restaurantId,
            addons: d.dataValues.addons,
            canRemove: d.dataValues.canRemove,
            notes: d.dataValues.notes,
            tableTalkPoints: d.dataValues.tableTalkPoints,
          }

          createDish(cCopy.dataValues.id, dishInfo)
          .then((dCopy) => {
            dCopy.setTags(d.Tags);
            resolve();
          })
        })
      }).catch((err) => {
        reject(err)
      })
    })
  })
}

module.exports = duplicateCategoriesAndDishes;
