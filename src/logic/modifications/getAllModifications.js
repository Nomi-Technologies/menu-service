const { Modification, Tag, Diet } = require('../../models');

async function getAllModifications(restaurantId) {
  return Modification.findAll({
    where: { restaurantId: restaurantId },
    include: [
      { model: Tag, as: 'Tags' },
      { model: Diet, as: 'Diets' }
    ]
  });
}

module.exports = getAllModifications;