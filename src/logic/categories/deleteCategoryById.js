const { Category } = require('../../models');

async function deleteCategoryById(categoryId) {
  return Category.destroy({
    where: { id: categoryId },
  });
};

module.exports = deleteCategoryById;