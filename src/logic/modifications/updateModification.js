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


module.exports.updateModification = async (req, res) => {
  const modificationData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }

  let modificationID = req.params.id;
  try {
    let modification = await Modification.findByPk(modificationID)
    await modification.update(modificationData);
    await modification.setTags(req.body.addTags, { through: { addToDish: true } })
    await modification.setTags(req.body.removeTags, { through: { addToDish: false } })
    res.send({
      message: "Modification successfully updated"
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Modification could not be created"
    });
  }
}