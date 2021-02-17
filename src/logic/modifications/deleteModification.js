async function deleteCategory(modification) {
    return modification.destroy();
  };
  
  module.exports = deleteCategory;