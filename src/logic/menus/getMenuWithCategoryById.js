const {
  Category,
  Diet,
  Dish,
  Menu,
  Tag,
} = require('../../models');

async function getMenuWithCategoryById(id) {
  return Menu.findByPk(id, {
    include: [
      {
        model: Category,
        include: [
          { model: Dish, as: 'Dishes', include: [{ model: Tag, as: 'Tags' }, { model: Diet, as: 'Diets' }] },
        ],
      },
    ],
    order: [[Category, 'index', 'asc']],
  });
}

module.exports = getMenuWithCategoryById;
