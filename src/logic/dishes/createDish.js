const { Dish } = require('../../models');

async function createDish(categoryId, dishInfo, { dishTags, dishModifications }) {
  const nextIdx = await Dish.count({
    where: {
      categoryId,
    },
  });
  const dish = await Dish.create({
    ...dishInfo,
    index: nextIdx,
  });

  if (dishTags) {
    await dish.setTags(dishTags);
  }
  if (dishModifications) {
    await dish.setModifications(dishModifications);
  }

  return dish;
}

module.exports = createDish;
