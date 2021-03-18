const restaurantLogic = require('../../logic/restaurants');
const logger = require('../../utils/logger');

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
    const data = await restaurantLogic.createRestaurant(restaurant);
    res.send(data);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured creating while processing this request',
    });
  }
}

module.exports = createRestaurant;
