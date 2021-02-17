const { Category } = require('../../models');

async function getDishesByCategory(userRestaurantId) {
  return Category.findAll({
    include: [
      { model: Dish, include: [{ model: Tag, as: "Tags" }, { model: Diet, as: "Diets" }] },
      { model: Menu, where: { restaurantId: userRestaurantId } },
    ],
  });
};

module.exports = getDishesByCategory;