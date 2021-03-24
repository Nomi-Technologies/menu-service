const dishLogic = require('../../logic/dishes');

async function updateDish(req, res) {
  const dishId = req.params.id;
  const newDetails = req.body;

  try {
    const dish = await dishLogic.getDishById(dishId);
    await dishLogic.updateDish(dish, newDetails);
    res.status(200).send({
      message: 'Dish updated successfully',
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while updating dish with dishId=${dishId}`,
    });
  }
}

module.exports = updateDish;
