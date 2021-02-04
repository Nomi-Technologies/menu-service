const { Modification } = require('../../models');

async function getAllModifications(restaurantId) {
  return Modification.findAll({
    where: { restaurantId }
  });
}

module.exports = getAllModifications;