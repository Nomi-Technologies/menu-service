const { Dish } = require('../../models');
const { Modification } = require('../../models');

async function createModification(modificationData, { tags, addTags, removeTags}) {
  const modification = Modification.create(modificationData);
  await modification.setTags(addTags, { through: { addToDish: true } });
  // .setTags will override the operation above
  await modification.addTags(removeTags, { through: { addToDish: false } });
  return modification;
};

module.exports = createModification;