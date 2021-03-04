const dietLogic = require('../../logic/diets');
const logger = require('../../utils/logger');

async function getAllDiets(req, res) {
  try {
    const diets = await dietLogic.getAllDiets();
    res.send(diets);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting all diets',
    });
  }
}

module.exports = getAllDiets;
