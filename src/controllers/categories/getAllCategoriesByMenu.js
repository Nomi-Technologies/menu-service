const categoryLogic = require('../../logic/categories');
const logger = require('../../utils/logger');

async function getAllCategoriesByMenu(req, res) {
  const { menuId } = req.params;

  try {
    const categories = await categoryLogic.getAllCategoriesByMenuId(menuId);
    res.send(categories);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting categories with menuId=${menuId}`,
    });
  }
}

module.exports = getAllCategoriesByMenu;
