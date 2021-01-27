const tagLogic = require('../../logic/tags');

async function getAllTags(req, res) {
  try {
    const tags = tagLogic.getAllTags();
    res.send(tags);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while getting all tags',
    });
  }
};

module.exports = getAllTags;