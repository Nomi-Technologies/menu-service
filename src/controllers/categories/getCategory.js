const categoryLogic = require('../../logic/categories');
const logger = require('../../utils/logger');

async function getCategory(req, res) {
  const categoryId = req.params.id;

  try {
    const category = await categoryLogic.getCategoryById(categoryId);
    res.send(category);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting category with id=${categoryId}`,
    });
  }
}

module.exports = getCategory;
