const { Tag } = require('../../models');

async function getAllTags() {
  return Tag.findAll();
}

module.exports = getAllTags;
