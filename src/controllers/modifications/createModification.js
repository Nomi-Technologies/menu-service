const modificationLogic = require('../../logic/modifications');
const dishLogic = require('../../logic/dishes');

async function createModification(req, res) {
  const dishId = req.params.id
  const modificationData = {
    dishId,
    restaurantId: req.params.restaurantId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  }
  const extraParams = {
    tags: req.body.Tags || null,
    addTags: req.body.addTags || null,
    removeTags: req.body.removeTags || null,
  }
  
  try {
    const dish = await dishLogic.getDishById(dishId);
    if(dish){
      const modifcation = await modificationLogic.createModification(modificationData, extraParams);
      res.send({
        modification: modifcation,
        message: "Modification successfully added",
      });
    }
    else {
      res.status(404).send({
        message: `dish not found for dishId=${dishId}`,
      });
    }
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured creating while processing this request",
    });
  }
};

module.exports = createModification;