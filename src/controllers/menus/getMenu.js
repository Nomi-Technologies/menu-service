const menuLogic = require('../../logic/menus');
const logger = require('../../utils/logger');

async function getMenu(req, res) {
  const { id } = req.params;

  try {
    const menu = await menuLogic.getMenuById(id);
    if (menu) {
      res.send(menu);
    }
    else {
      res.status(404).send({
        message: 'Could not find menu',
      });
    }
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting menus list',
    });
  }
}

module.exports = getMenu;
