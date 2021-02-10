const { Category } = require('../../models');

async function getCategoryById(id) {
  return Category.findByPk(id);
}

module.exports = getCategoryById;
