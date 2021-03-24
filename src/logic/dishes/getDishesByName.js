const { Op } = require('sequelize');
const {
  Category,
  Diet,
  Dish,
  Tag,
} = require('../../models');

async function getDishesByName(userRestaurantId, menuId, searchValue) {
  return Dish.findAll({
    where: {
      name: {
        [Op.iLike]: searchValue,
      },
      restaurantId: userRestaurantId,
    },
    include: [
      { model: Tag, as: 'Tags' },
      { model: Diet, as: 'Diets' },
      { model: Category, where: { menuId }, attributes: [] },
    ],
  });
}

module.exports = getDishesByName;
