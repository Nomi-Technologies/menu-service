const { Restaurant } = require('../../models');

async function restauantList(groupId) {
  return Restaurant.findAll({
    where: {
      groupId,
    },
  });
}

module.exports = restauantList;
