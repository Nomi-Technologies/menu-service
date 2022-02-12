/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
const dishLogic = require('../../logic/dishes');
const logger = require('../../utils/logger');

// TODO: Get user from auth and get restaurant from user
async function createDish(req, res) {
  console.log(req.body);
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
    // const totalDishTags = [...new Set([...req.body.dishTags, ...req.body.dishRemovableTags])];
    dish.setTags(req.body.dishTags || null);
    dish.setTags(req.body.dishRemovableTags, { through: { removable: true } } || null);
    // dish.addTags(totalDishTags || null);
    dish.setDiets(req.body.dishDiets || null);
    dish.setModifications(req.body.dishModification || null);
    res.send(dish);
  } catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'Dish could not be created',
    });
  }
}

module.exports = createDish;
