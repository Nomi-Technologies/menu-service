const { Modification } = require('../../models');

async function getModificationById(modificationId) {
  return Modification.findByPk(modificationID)
}

module.exports = getModificationById;