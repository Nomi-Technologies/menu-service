const dishLogic = require('../../logic/dishes');

async function getDishesByCategory(req, res) {
  const userRestaurantId = req.user.restaurantId;

  try {
    const dishesByCategory = await dishLogic.getDishesByCategory(userRestaurantId);
    res.send(dishesByCategory);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while getting categories list",
    });
  }
};

module.exports = getDishesByCategory;