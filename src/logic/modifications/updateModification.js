const restaurantLogic = require('../../logic/restaurants');

async function updateModification(modification, modificationData, { tags, addTags, removeTags}) {
  await modification.update(modificationData);
  await modification.setTags(addTags, { through: { addToDish: true } });
  // .setTags will override the operation above
  await modification.addTags(removeTags, { through: { addToDish: false } });
}

module.exports = updateModification;