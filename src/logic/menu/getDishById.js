const { Menu } = require('../../models');

async function getDishById(id) {
  return Dish.findByPk(id, {
    include: [
      { model: Category, attributes: ["name"] },
      { model: Tag, as: "Tags", attributes: ["id"] },
    ]
  });
}

module.exports = getDishById;
