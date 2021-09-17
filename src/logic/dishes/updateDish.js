async function updateDish(dish, newDetails) {
  const { dishTags, dishRemovableTags, dishModifications, dishDiets } = newDetails;
  await dish.update(newDetails);

  // dish tags should contain all tags, and removable can be a subset of those total tags
  let totalDishTags = [...new Set([...dishTags, ...dishRemovableTags])]

  if(dishRemovableTags) {
    await dish.setTags(dishRemovableTags, { through: { removable: true } })
  }

  if (dishTags) {
    await dish.addTags(totalDishTags);
  }

  if (dishDiets) {
    await dish.setDiets(dishDiets);
  }

  if (dishModifications) {
    await dish.setModifications(dishModifications);
  }

  return dish;
}

module.exports = updateDish;
