const restaurantLogic = require('../../logic/restaurants');

async function updateModification(modification, modificationData, { addTags, removeTags, addDiets, removeDiets }) {
  await modification.update(modificationData);
  await modification.setTags(addTags, { through: { addToDish: true } });
  // .setTags will override the operation above
  await modification.addTags(removeTags, { through: { addToDish: false } });
  await modification.setDiets(addDiets, { through: { addToDish: true } })
  await modification.addDiets(removeDiets, { through: { addToDish: false } })
}

module.exports = updateModification;