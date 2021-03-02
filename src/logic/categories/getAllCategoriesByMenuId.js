const { Category } = require('../../models');

async function getAllCategoriesByMenuId(menuId) {
  return Category.findAll({
    where: { menuId },
  });
}

module.exports = getAllCategoriesByMenuId;
