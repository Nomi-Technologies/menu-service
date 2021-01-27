const modificationLogic = require('../../logic/modifications');
const dishLogic = require('../../logic/dishes');

async function createModification(req, res) {
  const dishId = req.params.id
  const modificationData = {
    dishId,
    ...req.body
  }
  const extraParams = {
    tags: req.body.Tags || null,
  }
  
  try {
    const dish = dishLogic.getDishById(dishId);
    if(dish){
      const modifcation = modificationLogic.createModification(modificationData, extraParams);
      res.send({
        modification,
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