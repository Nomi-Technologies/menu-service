const { sequelize } = require('../../models');
const menuLogic = require('../../logic/menus');
const logger = require('../../utils/logger');

async function updateMenuOrder(req, res) {
  const { orderedMenus } = req.body;
  const t = await sequelize.transaction();

  try {
    await Promise.all(orderedMenus.map(async (menu) => {
      return menuLogic.updateMenuOrder(menu, t);
    }));
    await t.commit();
    res.send({
      message: 'category updated successfully',
    });
  }
  catch(error) {
    logger.error(error);
    await t.rollback();
    res.status(500).send({
      message: 'error updating category order',
    });
  }
}

module.exports = updateMenuOrder;
