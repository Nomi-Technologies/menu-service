const categoryLogic = require('../../logic/categories');

async function getCategory(req, res) {
  const categoryId = req.params.id;
  
  try {
    const category = await categoryLogic.getCategoryById(categoryId);
    res.send(category)
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || `An error occured while getting category with id=${categoryId}`,
    });
  }
};

module.exports = getCategory;