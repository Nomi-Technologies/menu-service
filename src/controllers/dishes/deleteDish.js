const dishLogic = require('../../logic/dishes');

async function deleteDish(req, res) {
  const userRestaurantId = req.user.restaurantId;
  const dishId = req.params.id;

  try {
    const dish = await dishLogic.getDishById(dishId);
    await dishLogic.deleteDish(dish, userRestaurantId);
    res.status(200).send({
      message: 'Dish deleted successfully',
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while deleting dish with dishId=${dishId}`,
    });
  }
}

module.exports = deleteDish;
