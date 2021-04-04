const { Op } = require('sequelize');
const {
  Category,
  Diet,
  Dish,
  Tag,
} = require('../../models');

async function getDishesByName(menuId, searchValue) {
  return Dish.findAll({
    where: {
      name: {
        [Op.iLike]: searchValue,
      },
    },
    include: [
      { model: Tag, as: 'Tags' },
      { model: Diet, as: 'Diets' },
      { model: Category, where: { menuId }, attributes: [] },
    ],
  });
}

module.exports = getDishesByName;
