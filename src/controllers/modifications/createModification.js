const modificationLogic = require('../../logic/modifications');
const dishLogic = require('../../logic/dishes');

async function createModification(req, res) {
  const modificationData = {
    restaurantId: req.user.restaurantId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price ?? '0',
  };
  const extraParams = {
    addTags: req.body.addTags || null,
    removeTags: req.body.removeTags || null,
  };

  try {
    const modifcation = await modificationLogic.createModification(modificationData, extraParams);
    res.send({
      modification: modifcation,
      message: 'Modification successfully added',
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured creating while processing this request',
    });
  }
}

module.exports = createModification;
