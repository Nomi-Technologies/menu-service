const menuLogic = require('../../logic/menu');

async function createMenu(req, res) {
  const menuData = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    published: true,
  };

  try {
    const menu = await createMenu(menuData);
    if(req.body.csv) {
      try {
        await parseCSV(req.body.csv, req.user.restaurantId, menu.id, req.body.overwrite)
      } catch (err) {
        // if there's an error, clean up the menu that was created
        await destroyMenuById(menu.id);
        res.status(500).send({
          message: err.message || "Menu could not be created with supplied .csv file",
        });
        return
      }
    }

    res.send(menu)
  } catch(err) {
    res.status(500).send({
      message: err.message || "Menu could not be created",
    });
  }
};

module.exports = createMenu;
