const { Category } = require('../../models');

async function createCategory(menuId, categoryInfo) {
  const nextIdx = await Category.count({
    where: {
      menuId,
    },
  });
  return Category.create({
    ...categoryInfo,
    index: nextIdx,
  });
}

module.exports = createCategory;
