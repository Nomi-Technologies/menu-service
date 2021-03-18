const tagLogic = require('../../logic/tags');
const logger = require('../../utils/logger');

async function getAllTags(req, res) {
  try {
    const tags = await tagLogic.getAllTags();
    res.send(tags);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting all tags',
    });
  }
}

module.exports = getAllTags;
