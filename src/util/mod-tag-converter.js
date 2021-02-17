module.exports = (modification) => {
  const copy = {
    ...modification,
    addTags: modification.Tags?.filter((tag) => tag.ModificationTag.addToDish),
    removeTags: modification.Tags?.filter((tag) => !tag.ModificationTag.addToDish),
  };
  delete copy['Tags'];
  return copy;
}