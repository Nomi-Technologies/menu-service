const { Tag } = require('../../models');

async function getAllTags(req, res) {
  return Tag.findAll();
}

module.exports = getAllTags;
