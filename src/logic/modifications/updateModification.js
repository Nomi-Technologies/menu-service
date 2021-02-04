const restaurantLogic = require('../../logic/restaurants');

async function updateModification(modification, modificationData, { tags, addTags, removeTags}) {
  await modification.update(modificationData);
  if(tags){
    await modification.setTags(tags);
  }
  if(addTags){
    await modification.setTags(addTags, { through: { addToDish: true } });
  }
  if(removeTags){
    await modification.setTags(removeTags, { through: { addToDish: false } });
  }
}

module.exports = updateModification;