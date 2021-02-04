const dishLogic = require('../../logic/dishes');

// gets restaurant information based on authentication
async function getDish(req, res) {
  const dishId = req.params.id;

  try {
    const dish = await dishLogic.getDishById(dishId);const plainDish = dish.toJSON();
    plainDish.Modifications.forEach((modification) => {
      modification['addTags'] = modification.Tags?.filter((tag) => tag.ModificationTag.addToDish);
      modification['removeTags'] = modification.Tags?.filter((tag) => !tag.ModificationTag.addToDish);
      delete modification['Tags'];
    });
    res.send(plainDish);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting dish with id==${dishId}`,
    });
  }
};

module.exports = getDish;