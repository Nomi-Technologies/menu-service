/* eslint-disable linebreak-style */
const { Modification } = require('../../models');

async function createModification(modificationData, extraParams) {
  const {
    addTags,
    removeTags,
    addDiets,
    removeDiets,
  } = extraParams;
  const modification = await Modification.create(modificationData);
  await modification.setTags(addTags, { through: { addToDish: true } });
  // .setTags will override the operation above
  await modification.addTags(removeTags, { through: { addToDish: false } });
  await modification.setDiets(addDiets, { through: { addToDish: true } });
  await modification.addDiets(removeDiets, { through: { addToDish: false } });

  return modification;
}

module.exports = createModification;
