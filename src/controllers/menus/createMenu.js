const menuLogic = require('../../logic/menus');
const { parseCSV } = require('../../utils/csv-parser');
const logger = require('../../utils/logger');

async function createMenu(req, res) {
  const menuData = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    published: true,
  };
  const { body: { csv, overwrite } } = req;
  let menu;
  try {
    menu = await menuLogic.createMenu(menuData);
    if (csv) {
      await parseCSV(csv, menu.id, overwrite);
    }
    res.send(menu);
  }
  catch(err) {
    // if there's an error, clean up the menu that was created
    await menuLogic.deleteMenuById(menu.id);
    logger.error(err);
    res.status(500).send({
      message: err.message || 'Menu could not be created',
    });
  }
}

module.exports = createMenu;
