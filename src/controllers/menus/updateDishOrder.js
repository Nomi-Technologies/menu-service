const { sequelize } = require('../../models');
const dishLogic = require('../../logic/dishes');
const logger = require('../../utils/logger');

async function updateDishOrder(req, res) {
  const { order } = req.body;
  const t = await sequelize.transaction();

  try {
    await Promise.all(order.map(async (dishId) => {
      const dish = await dishLogic.getDishById(dishId);
      dish.index = order.indexOf(dishId);
      await dish.save({ transaction: t });
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

module.exports = updateDishOrder;
