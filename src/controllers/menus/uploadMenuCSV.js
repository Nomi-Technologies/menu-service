const { parseCSV } = require('../../utils/csv-parser');
const logger = require('../../utils/logger');

// reads csv and creates menu
async function uploadMenuCSV(req, res) {
  const { data } = req.body;
  const { menuId } = req.params;
  const { overwrite } = req.body;

  try {
    const completed = await parseCSV(data, menuId, overwrite);
    res.send(completed);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: 'An error occured while processing this request',
    });
  }
}

module.exports = uploadMenuCSV;
