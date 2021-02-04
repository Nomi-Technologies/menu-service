const dishLogic = require('../../logic/dishes');

// gets restaurant information based on authentication
async function getDish(req, res) {
  const dishId = req.params.id;

  try {
    const dish = await dishLogic.getDishById(dishId);
    res.send(dish);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting dish with id==${dishId}`,
    });
  }
};

module.exports = getDish;