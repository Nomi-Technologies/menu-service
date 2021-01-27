
const { Op } = require("sequelize");

async function getDishesByName(userRestaurantId, menuId, searchValue) {
  return Dish.findAll({
    where: {
      name: {
        [Op.iLike]: searchValue,
      },
      restaurantId: userRestaurantId,
    },
    include: [
      { model: Tag, as: "Tags" },
      { model: Category, where: { menuId: menuId }, attributes: [] },
    ],
  });
};

module.exports = getDishesByName;