const categoryLogic = require('../../logic/categories');

async function getAllCategoriesByMenu(req, res) {
  const menuId = req.params.menuId;
  
  try {
    const categories = await categoryLogic.getAllCategoriesByMenuId(menuId);
    res.send(categories);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting categories with menuId=${menuId}`,
    });
  }
};

module.exports = getAllCategoriesByMenu;