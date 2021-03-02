const {
  Category,
  Diet,
  Dish,
  Menu,
  Tag,
} = require('../../models');

async function getMenuWithCategoryByIdOrdered(id) {
  return Menu.findOne({
    where: { id },
    include: [
      {
        model: Category,
        include: [
          {
            model: Dish,
            as: 'Dishes',
            include: [
              { model: Tag, as: 'Tags' },
              { model: Diet, as: 'Diets' },
            ],
          },
        ],
        order: [[Dish, 'index', 'asc']],
      },
    ],
    order: [[Category, 'index', 'asc']],
  });
}

module.exports = getMenuWithCategoryByIdOrdered;
