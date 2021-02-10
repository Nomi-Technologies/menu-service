const { Menu } = require('../../models');

async function getMenuWithCategoryById(id) {
  return Menu.findByPk(id, {
    include: [
      {
        model: Category,
        include: [
          { model: Dish, as: 'Dishes', include: [{ model: Tag, as: 'Tags' }] },
        ],
      },
    ],
    order: [[Category, 'index', 'asc']],
  });
}

module.exports = getMenuWithCategoryById;
