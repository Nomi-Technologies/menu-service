const { Dish } = require('../../models');
const { Modification } = require('../../models');

async function createModification(modificationData, { tags, addTags, removeTags}) {
  const modification = Modification.create(modificationData);
  if(tags){
    await modification.setTags(tags);
  }
  if(addTags){
    await modification.setTags(addTags, { through: { addToDish: true } });
  }
  if(removeTags){
    await modification.setTags(removeTags, { through: { addToDish: false } });
  }
  return modification;
};

module.exports = createModification;