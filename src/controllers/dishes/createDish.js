const dishLogic = require('../../logic/dishes');

// TODO: Get user from auth and get restaurant from user
async function createDish(req, res) {
  const dishData = {
    name: req.body.name,
    description: req.body.description,
    addons: req.body.addons,
    canRemove: req.body.canRemove,
    notes: req.body.notes,
    tableTalkPoints: req.body.tableTalkPoints,
    restaurantId: req.user.restaurantId,
    categoryId: req.body.categoryId,
    menuId: req.body.menuId,
    price: req.body.price,
  };

  try {
    const dish = await dishLogic.createDish(dishData.categoryId, dishData);
    dish.setTags(req.body.dishTags || null);
    dish.setDiets(req.body.dishDiets || null);
    dish.setModifications(req.body.dishModification || null);
    res.send(dish);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'Dish could not be created',
    });
  }
}

module.exports = createDish;
