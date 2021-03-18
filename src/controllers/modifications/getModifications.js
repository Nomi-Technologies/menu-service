const modificationLogic = require('../../logic/modifications');
const modConverter = require('../../utils/mod-tag-converter');
const logger = require('../../utils/logger');

async function getModifications(req, res) {
  const { restaurantId } = req.user;

  try {
    const modifications = await modificationLogic.getAllModifications(restaurantId);
    const plainModifications = modifications.map((modification) => {
      const plainMod = modification.toJSON();
      return modConverter(plainMod);
    });
    res.send(plainModifications);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: 'An error occurred while finding all modifications',
    });
  }
}

module.exports = getModifications;
