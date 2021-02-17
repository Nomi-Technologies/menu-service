async function updateDish(dish, newDetails) {
  const { dishTags, dishModifications, dishDiets } = newDetails;
  
  await dish.update(newDetails);

  if(dishTags) {
    await dish.setTags(dishTags)
  }

  if(dishDiets) {
    await dish.setDiets(dishDiets)
  }

  if(dishModifications) { 
    await dish.setModifications(dishModifications)
  }

  return dish;
};

module.exports = updateDish;
