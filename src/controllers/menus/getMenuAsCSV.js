const menuLogic = require('../../logic/menus');
const { menuToCSV } = require('../../util/csv-parser');

async function getMenuAsCSV(req, res) {
  const menuId = req.params.id;
  
  try {
    const menu = await  menuLogic.getMenuWithCategoryByIdOrdered(menuId);
    const csv = await menuToCSV(menu);
    res.send({ csv });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: 'Could not get menu as CSV',
    });
  }
}

module.exports = getMenuAsCSV;
