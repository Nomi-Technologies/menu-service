const categoryLogic = require('../../logic/categories');
const logger = require('../../utils/logger');

async function createCategory(req, res) {
  const { menuId } = req.params;
  const categoryData = req.body;

  try {
    const category = await categoryLogic.createCategory(menuId, categoryData);
    res.send(category);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'Category could not be created',
    });
  }
}

module.exports = createCategory;
