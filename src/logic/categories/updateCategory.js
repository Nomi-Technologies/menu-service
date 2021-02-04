async function updateCategory(category, newDetails) {
  return category.update(newDetails);
};

module.exports = updateCategory;