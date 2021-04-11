const menuLogic = require('../../logic/menus');

async function updateMenu(req, res) {
  const { menuId } = req.params.id;
  const menuData = req.body;

  try {
    const menu = await menuLogic.getMenuById(menuId);
    if (menu) {
      await menuLogic.updateMenuById(menuData, menuId);
      res.status(200).send({
        message: 'update sucessful',
      });
    }
    else {
      res.status(400).send({
        message: 'could not find menu',
      });
    }
  }
  catch(err) {
    res.status(500).send({
      message: `An error occured while updating menu with id=${req.params.id}`,
    });
  }
}

module.exports = updateMenu;
