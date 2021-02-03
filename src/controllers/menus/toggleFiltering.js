const menuLogic = require('../../logic/menu');

async function toggleFiltering(req, res) {
  const enableFiltering = req.body.enableFiltering;
  const menuId = req.params.id;
  
  try {
    await menuLogic.updateMenuById({ enableFiltering }, menuId);
    res.status(200).send({
      message: enableFiltering ? 'filtering enabled' : 'filtering disabled',
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while updating filtering',
    });
  }
}

module.exports = toggleFiltering;
