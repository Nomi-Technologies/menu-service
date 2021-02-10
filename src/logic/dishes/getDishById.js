const {
  Dish, Category, Tag, Modification,
} = require('../../models');

// gets restaurant information based on authentication
async function getDishById(id) {
  return Dish.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ['name'],
      },
      {
        model: Tag,
        as: 'Tags',
        attributes: ['id', 'name', 'type'],
      },
      {
        model: Modification,
        as: 'Modifications',
        include: { model: Tag, as: 'Tags', attributes: ['id', 'name', 'type'] },
      },
    ],
  });
}

module.exports = getDishById;
