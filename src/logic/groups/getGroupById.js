const { Group } = require('../../models');

async function getGroupById(groupId) {
  return Group.findByPk(groupId);
}

module.exports = getGroupById;
