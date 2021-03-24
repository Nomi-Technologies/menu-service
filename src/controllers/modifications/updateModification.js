const modificationLogic = require('../../logic/modifications');

async function updateModification(req, res) {
  const modificationId = req.params.id;
  const modificationData = {
    name: req.body.name,
    price: req.body.price,
  };
  const extraParams = {
    addTags: req.body.addTags || null,
    removeTags: req.body.removeTags || null,
    addDiets: req.body.addDiets || null,
    removeDiets: req.body.removeDiets || null,
  };

  try {
    const modification = await modificationLogic.getModificationById(modificationId);
    await modificationLogic.updateModification(modification, modificationData, extraParams);
    res.status(200).send({
      message: 'update sucessful',
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while updating modification with modificationId=${modificationId}`,
    });
  }
}

module.exports = updateModification;
