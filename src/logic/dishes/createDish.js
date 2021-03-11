const { Dish } = require('../../models');

async function createDish(categoryId, dishInfo) {
  const nextIdx = await Dish.count({
    where: {
      categoryId,
    },
  });
  const dish = await Dish.create({
    ...dishInfo,
    index: nextIdx,
  });

  return dish;
}

module.exports = createDish;
