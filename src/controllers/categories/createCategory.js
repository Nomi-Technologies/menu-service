const categoryLogic = require('../../logic/categories');

async function createCategory(req, res) {
  const menuId = req.body.menuId;
  const categoryData = req.body;
  
  try {
    const category = await categoryLogic.createCategory(menuId, categoryData);
    res.send(category)
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Category could not be created",
    });
  }
};

module.exports = createCategory;