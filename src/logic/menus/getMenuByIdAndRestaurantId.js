const { Menu, Category, Dish, Tag, Modification } = require('../../models');

async function getMenuByIdAndRestaurantId(menuId, restaurantId) {
  return Menu.findOne({
    where: { 
      restaurantId: restaurantId, 
      id: menuId 
    },
    include: [
      {
        model: Category,
        include: [
          {
            model: Dish,
            as: "Dishes",
            include: [
              { 
                model: Tag, 
                as: "Tags" 
              },
              {
                model: Modification,
                as: "Modifications",
                include: [ { model: Tag, as: "Tags" } ],
              },
            ],
            order: [[Dish, "index", "asc"]]
          },
        ],
        order: [
          [{ model: Dish, as: 'Dishes' }, 'index', 'asc']
        ]
      },
    ],
    order: [[Category, "index", "asc"]],
  })
}

module.exports = getMenuByIdAndRestaurantId;
