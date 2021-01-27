async function updateCategory(category) {
  return category.destroy();
};

module.exports = updateCategory;