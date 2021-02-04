const modificationLogic = require('../../logic/modifications');

async function getModifications(req, res) {
  const restaurantId = req.user.restaurantId;

  try {
    const modifications = await modificationLogic.getAllModifications(restaurantId);
    res.send(modifications);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'An error occurred while finding all modifications',
    });
  }

}

module.exports = getModifications;
