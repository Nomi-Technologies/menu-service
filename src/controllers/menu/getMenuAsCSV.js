const menuLogic = require('../../logic/menu');
const { menuToCSV } = require("../../util/csv-parser");

async function getMenuAsCSV(req, res) {
  let menuId = req.params.id;
  menuLogic.getMenuWithCategoryByIdOrdered(menuId).then((menu) => {
    return menuToCSV(menu)
  }).then((csv) => {
    res.send({
      csv: csv
    })
  }).catch((err) => {
    console.error(err);
    res.status(500).send({
      message: "Could not get menu as CSV"
    })
  })
}
