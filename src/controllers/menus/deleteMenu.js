const menuLogic = require('../../logic/menus');

async function deleteMenu(req, res) {
  const { menuId } = req.params;

  try {
    const menu = await menuLogic.getMenuById(menuId);
    if (menu) {
      await menuLogic.deleteMenuById(menuId);
      res.send({
        message: 'menu was deleted successfully',
      });
    }
    else {
      // sends if menu does not exist, or user does not have access
      res.status(404).send({
        message: 'Could not find menu to delete',
      });
    }
  }
  catch(err) {
    res.status(500).send({
      message: `An error occured while delete menu with id=${menuId}`,
    });
  }
}

module.exports = deleteMenu;
