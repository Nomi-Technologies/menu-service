const menuLogic = require('../../logic/menu');

// params: ordering: a list of category objects depicting the current order of the menu
// note: every category should be passed in, regardless of if categories were reordered or not.
// let example = [
//   {
//     id: 1,
//     dishes: [
//       0, 1, 2, 3
//     ]
//   },
// ]

async function updateCategoryOrder(req, res) {
  const { order } = req.body;

  try {
    const t = await sequelize.transaction();
    await Promise.all(order.map(async (categoryId) => {
      let category = await Category.findByPk(categoryId)
      category.index = order.indexOf(categoryId)
      await category.save({ transaction: t })
    }));
    await t.commit();
    res.send({
      message: 'category updated successfully',
    });
  }
  catch(err) {
    console.error(err);
    await t.rollback();
    res.status(500).send({
      message: 'error updating category order'
    });
  }
}

module.exports = updateCategoryOrder;
