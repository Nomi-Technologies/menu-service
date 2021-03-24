const categoryLogic = require('../../logic/categories');

async function deleteCategory(req, res) {
  const categoryId = req.params.id;

  try {
    const category = await categoryLogic.getCategoryById(categoryId);
    await categoryLogic.deleteCategory(category);
    res.status(200).send({
      message: 'category was deleted successfully',
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while deleting category with id=${categoryId}`,
    });
  }
}

module.exports = deleteCategory;
