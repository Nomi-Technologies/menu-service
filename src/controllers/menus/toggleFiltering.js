const menuLogic = require('../../logic/menus');
const logger = require('../../utils/logger');

async function toggleFiltering(req, res) {
  const { enableFiltering } = req.body;
  const menuId = req.params.id;

  try {
    await menuLogic.updateMenuById({ enableFiltering }, menuId);
    res.status(200).send({
      message: enableFiltering ? 'filtering enabled' : 'filtering disabled',
    });
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while updating filtering',
    });
  }
}

module.exports = toggleFiltering;
