const modificationLogic = require('../../logic/modifications');

// gets restaurant information based on authentication
async function deleteModification(req, res) {
  const dishId = req.params.dishId
  const modificationId = req.params.modificationId
  try {
    const modification = await modificationLogic.getModificationByDishId(modificationId, dishId);
    await modificationLogic.deleteModification(modification);
    res.send({
      message: "Modification successfully removed"
    })
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while deleting modification with modificationId=${modificationId} and dishId=${dishId}`,
    });
  }
};

module.exports = deleteModification;