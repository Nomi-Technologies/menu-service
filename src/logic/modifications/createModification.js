const { Modification } = require('../../models');

async function createModification(modificationData, { addTags, removeTags }) {
  const modification = await Modification.create(modificationData);
  await modification.setTags(addTags, { through: { addToDish: true } });
  // .setTags will override the operation above
  await modification.addTags(removeTags, { through: { addToDish: false } });
  return modification;
}

module.exports = createModification;
