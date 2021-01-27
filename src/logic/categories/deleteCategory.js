async function deleteCategory(category) {
  return category.destroy();
};

module.exports = deleteCategory;