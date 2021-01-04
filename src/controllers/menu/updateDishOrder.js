const menuLogic = require('../../logic/menu');

async function updateDishOrder(req, res) {
  const { order } = req.body;

  try {
    const t = await sequelize.transaction()
    await Promise.all(order.map(async (dishId) => {
      let dish = await Dish.findByPk(dishId)
      dish.index = order.indexOf(dishId)
      await dish.save({ transaction: t })
    }))

    await t.commit()
    res.send({
      message: "category updated successfully"
    })
  }
  catch(error) {
    console.error(error)
    await t.rollback()
    res.status(500).send({
      message: "error updating category order"
    })

  }
}

module.exports = updateDishOrder;
