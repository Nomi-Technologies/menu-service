const modificationLogic = require('../../logic/modifications');

async function getModifications(req, res) {
  const restaurantId = req.user.restaurantId;

  try {
    const modifications = await modificationLogic.getAllModifications(restaurantId);
    plainModifications = modifications.map((modification) => {
      const plainMod = modification.toJSON();
      plainMod['addTags'] = plainMod.Tags?.filter((tag) => tag.ModificationTag.addToDish);
      plainMod['removeTags'] = plainMod.Tags?.filter((tag) => !tag.ModificationTag.addToDish);
      delete plainMod['Tags'];
      return plainMod;
    })
    res.send(plainModifications);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'An error occurred while finding all modifications',
    });
  }

}

module.exports = getModifications;
