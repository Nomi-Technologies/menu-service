const categoryLogic = require('../../logic/categories');
const logger = require('../../utils/logger');

async function deleteCategory(req, res) {
  const { categoryId } = req.params;

  try {
    const category = await categoryLogic.getCategoryById(categoryId);
    await categoryLogic.deleteCategory(category);
    res.status(200).send({
      message: 'category was deleted successfully',
    });
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || `An error occured while deleting category with id=${categoryId}`,
    });
  }
}

module.exports = deleteCategory;
