const { Diet } = require('../../models');

async function getAllDiets(req, res) {
  return Diet.findAll();
};

module.exports = getAllDiets;