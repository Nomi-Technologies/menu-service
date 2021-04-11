const categoryLogic = require('../../logic/categories');
const logger = require('../../utils/logger');

async function getCategory(req, res) {
  const { categoryId } = req.params;

  try {
    const category = await categoryLogic.getCategoryById(categoryId);
    res.send(category);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: `An error occured while getting category with id=${categoryId}`,
    });
  }
}

module.exports = getCategory;
