const {
  Category,
  Diet,
  Dish,
  Menu,
  Modification,
  Tag,
} = require('../../models');

async function getMenuByIdAndRestaurantId(menuId, restaurantId) {
  return Menu.findOne({
    where: {
      restaurantId,
      id: menuId,
    },
    include: [
      {
        model: Category,
        include: [
          {
            model: Dish,
            as: 'Dishes',
            include: [
              {
                model: Tag,
                as: 'Tags',
              },
              {
                model: Diet,
                as: 'Diets',
              },
              {
                model: Modification,
                as: 'Modifications',
                include: [{ model: Tag, as: 'Tags' }, { model: Diet, as: 'Diets' }],
              },
            ],
            order: [[Dish, 'index', 'asc']],
          },
        ],
        order: [
          [{ model: Dish, as: 'Dishes' }, 'index', 'asc'],
        ],
      },
    ],
    order: [[Category, 'index', 'asc']],
  });
}

module.exports = getMenuByIdAndRestaurantId;
