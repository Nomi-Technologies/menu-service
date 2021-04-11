const categoryLogic = require('../../logic/categories');
const logger = require('../../utils/logger');

async function updateCategory(req, res) {
  const { categoryId } = req.params;
  const newDetails = req.body;

  try {
    const category = await categoryLogic.getCategoryById(categoryId);
    await categoryLogic.updateCategory(category, newDetails);
    res.status(200).send(category);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: `An error occured while updating category with id=${categoryId}`,
    });
  }
}

module.exports = updateCategory;
