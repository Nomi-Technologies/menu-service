const { Category } = require('../../models');

async function updateCategoryById(categoryId, newDetails) {
  return Category.update(newDetails, { where: { id: categoryId } });
};

module.exports = updateCategoryById;