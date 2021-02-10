const modificationLogic = require('../../logic/modifications');
const modConverter = require('../../util/mod-tag-converter');

async function getModifications(req, res) {
  const { restaurantId } = req.user;

  try {
    const modifications = await modificationLogic.getAllModifications(restaurantId);
    plainModifications = modifications.map((modification) => {
      const plainMod = modification.toJSON();
      return modConverter(plainMod);
    });
    res.send(plainModifications);
  }
  catch(err) {
    console.log(err);
    res.status(500).send({
      message: 'An error occurred while finding all modifications',
    });
  }
}

module.exports = getModifications;
