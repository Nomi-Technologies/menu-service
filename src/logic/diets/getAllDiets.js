const { Diet } = require('../../models');

async function getAllDiets() {
  return Diet.findAll();
}

module.exports = getAllDiets;
