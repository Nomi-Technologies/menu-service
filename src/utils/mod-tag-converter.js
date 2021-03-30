module.exports = (modification) => {
  const copy = {
    ...modification,
    addTags: modification.Tags?.filter((tag) => tag.ModificationTag.addToDish),
    removeTags: modification.Tags?.filter((tag) => !tag.ModificationTag.addToDish),
    addDiets: modification.Diets?.filter((diet) => diet.ModificationDiet.addToDish),
    removeDiets: modification.Diets?.filter((diet) => !diet.ModificationDiet.addToDish),
  };
  delete copy.Tags;
  delete copy.Diets;
  return copy;
};
