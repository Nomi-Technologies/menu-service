const {
  Category,
  Diet,
  Dish,
  Modification,
  Tag,
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
        model: Diet,
        as: "Diets",
        attributes: ["id", "name"]
      },
      {
        model: Modification,
        as: 'Modifications',
        include: [
          { model: Tag, as: 'Tags', attributes: ['id', 'name', 'type'] },
          { model: Diet, as: 'Diets', attributes: ['id', 'name'] },
        ]
      },
    ],
  });
}

module.exports = getDishById;
