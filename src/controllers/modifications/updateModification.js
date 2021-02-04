const modificationLogic = require('../../logic/restaurants');

async function updateModification(req, res) {
  const modificationId = req.params.id;
  const modificationData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }
  const extraParams = {
    tags: req.body.Tags || null,
    addTags: req.body.addTags || null,
    removeTags: req.body.removeTags || null,
  }
  try {
    const modification = await restaurantLogic.getModificationById(modificationId);
    await modificationLogic.updateModification(modification, modificationData, extraParams);
    res.status(200).send({
      message: "update sucessful",
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while updating modification with modificationId=${modificationId}`,
    });
  }
};

module.exports = updateModification;