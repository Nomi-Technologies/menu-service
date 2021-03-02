const { parseCSV } = require('../../util/csv-parser');

// reads csv and creates menu
async function uploadMenuCSV(req, res) {
  const { data } = req.body;
  const { restaurantId } = req.user;
  const menuId = req.params.id;
  const { overwrite } = req.body;

  try {
    const completed = await parseCSV(data, restaurantId, menuId, overwrite);
    res.send(completed);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while processing this request',
    });
  }
}

module.exports = uploadMenuCSV;
