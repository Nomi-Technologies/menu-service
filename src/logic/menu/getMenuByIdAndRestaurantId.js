const { Menu } = require('../../models');

async function getMenuByIdAndRestaurantId(id, userRestaurantId) {
  return Menu.findOne({
    where: { restaurantId: userRestaurantId, id: id },
    include: [
      {
        model: Category,
        include: [
          {
            model: Dish,
            as: "Dishes",
            include: [
              { model: Tag, as: "Tags" },
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
