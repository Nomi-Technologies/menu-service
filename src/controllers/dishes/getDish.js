const dishLogic = require('../../logic/dishes');
const modConverter = require('../../utils/mod-tag-converter');
const logger = require('../../utils/logger');

// gets restaurant information based on authentication
async function getDish(req, res) {
  const { dishId } = req.params;

  try {
    const dish = await dishLogic.getDishById(dishId);
    const plainDish = dish.toJSON();
    plainDish.Modifications = plainDish.Modifications.map((mod) => modConverter(mod));
    res.send(plainDish);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: `An error occured while getting dish with id==${dishId}`,
    });
  }
}

module.exports = getDish;
