async function updateDish(dish, newDetails) {
  const { dishTags, dishModifications } = newDetails;
  
  await dish.update(newDetails);

  if(dishTags) {
    await dish.setTags(dishTags)
  }

  if(dishModifications) { 
    await dish.setModifications(dishModifications)
  }

  return dish;
};

module.exports = updateDish;
