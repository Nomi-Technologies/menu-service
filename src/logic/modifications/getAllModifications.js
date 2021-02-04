const { Modification, Tag } = require('../../models');

async function getAllModifications(restaurantId) {
  return Modification.findAll({
    where: { restaurantId },
    include: {
      model: Tag,
      as: 'Tags',
      attributes: ['id', 'name', 'type'],
    }
  });
}

module.exports = getAllModifications;