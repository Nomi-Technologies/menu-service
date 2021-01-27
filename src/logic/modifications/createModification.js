const { Dish } = require('../../models');
const { Modification } = require('../../models');

async function createModification(modificationData, { tags }) {
  const modification = Modification.create(modificationData);
  if(tags){
    await modification.setTags(tags);
  }
  return modification;
};

module.exports = createModification;