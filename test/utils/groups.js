const { v4: uuidv4 } = require('uuid');
const { Group } = require('../../src/models');

async function createTestGroup(group) {
  return Group.create(group);
}

async function deleteTestGroup(group) {
  return group.destroy();
}

async function deleteTestGroupById(groupId) {
  return Group.destroy({
    where: { id: groupId },
  });
}

function generateTestGroupData(group = {}) {
  const testGroup = {
    id: group.id || uuidv4(),
    name: group.name || Math.random().toString(),
  };
  return testGroup;
}

module.exports = {
  createTestGroup,
  deleteTestGroup,
  deleteTestGroupById,
  generateTestGroupData,
};
