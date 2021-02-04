const { Modification } = require('../../models');

async function getModificationByDishId(modificationId, dishId) {
  return Modification.findOne({
    where: {
      id: modificationId,
      dishId: dishId
    }
  });
}

module.exports = getModificationByDishId;