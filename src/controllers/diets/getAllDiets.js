const dietLogic = require('../../logic/diets');

async function getAllDiets(req, res) {
  try {
    const diets = await dietLogic.getAllDiets();
    res.send(diets);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting all diets',
    });
  }
}

module.exports = getAllDiets;
