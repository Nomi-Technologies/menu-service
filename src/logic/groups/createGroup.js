const { Group } = require('../../models');

async function createGroup(name) {
  return Group.create({
    name,
  });
}

module.exports = createGroup;
