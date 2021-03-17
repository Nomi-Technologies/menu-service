const modificationLogic = require('../../logic/modifications');
const logger = require('../../utils/logger');

// gets restaurant information based on authentication
async function deleteModification(req, res) {
  const { dishId } = req.params;
  const { modificationId } = req.params;
  try {
    const modification = await modificationLogic.getModificationByDishId(modificationId, dishId);
    await modificationLogic.deleteModification(modification);
    res.send({
      message: 'Modification successfully removed',
    });
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || `An error occured while deleting modification with modificationId=${modificationId} and dishId=${dishId}`,
    });
  }
}

module.exports = deleteModification;
