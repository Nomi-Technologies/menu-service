const menuLogic = require('../../logic/menus');

async function setPublished(req, res) {
  const menuId = req.params.id;
  const menuData = req.body;

  try {
    const menu = await menuLogic.getMenuById(menuId);
    if (menu) {
      await menuLogic.updateMenuById(menuData, menuId);
      res.status(200).send({
        message: 'update successful',
      });
    }
  }
  catch(err) {
    res.status(500).send({
      message: 'unable to update successfully',
    });
    console.error(err);
  }
}

module.exports = setPublished;
