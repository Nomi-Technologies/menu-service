const restaurantLogic = require('../../logic/restaurants');

// gets restaurant information based on authentication
async function getRestaurant(req, res) {
  const userRestaurantId = req.user.restaurantId;
  try {
    const restaurant = await restaurantLogic.getRestaurantById(userRestaurantId);
    res.send(restaurant);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting restaurant with restaurant_id=${userRestaurantId}`,
    });
  }
}

module.exports = getRestaurant;
