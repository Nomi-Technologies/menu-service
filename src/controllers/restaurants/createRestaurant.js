const restaurantLogic = require('../../logic/restaurants');

async function createRestaurant(req, res) {
  const restaurant = {
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    url: req.body.url,
  };
  
  try {
    const data = restaurantLogic.createRestaurant(restaurant);
    res.send(data);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured creating while processing this request",
    });
  }
};

module.exports = createRestaurant;