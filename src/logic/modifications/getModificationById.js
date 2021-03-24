const { Modification } = require('../../models');

async function getModificationById(modificationId) {
  return Modification.findByPk(modificationId);
}

module.exports = getModificationById;
