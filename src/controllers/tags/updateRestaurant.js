const restaurantLogic = require('../../logic/restaurants');

async function updateRestaurant(req, res) {
  const userRestaurantId = req.params.id;
  const newDetails = req.body;
  
  try {
    const restaurant = await restaurantLogic.getRestaurantById(userRestaurantId);
    await restaurantLogic.updateRestaurant(restaurant, newDetails);
    res.status(200).send({
      message: "update sucessful",
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while updating restaurant with restaurant_id=${userRestaurantId}`,
    });
  }
};

module.exports = updateRestaurant;