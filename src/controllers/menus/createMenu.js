const menuLogic = require('../../logic/menus');
const { parseCSV } = require("../../util/csv-parser");

async function createMenu(req, res) {
  const menuData = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    published: true,
  };
  const { body: { csv, overwrite } } = req;

  try {
    const menu = await menuLogic.createMenu(menuData);
    if(csv) {
      await parseCSV(csv, menu.restaurantId, menu.id, overwrite)
    }
    res.send(menu)
  } 
  catch(err) {
    // if there's an error, clean up the menu that was created
    await menuLogic.destroyMenuById(menu.id);
    res.status(500).send({
      message: err.message || 'Menu could not be created',
    });
  }
};

module.exports = createMenu;
