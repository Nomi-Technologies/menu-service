const groupLogic = require('../../logic/groups');
const logger = require('../../utils/logger');

async function createGroup(req, res) {
  const body = { req };

  try {
    const group = await groupLogic.createGroup(body.name);
    res.send(group);
  }
  catch(error) {
    logger.error(error);
    res.status(500).send({
      message: 'error createing group',
    });
  }
}

module.exports = createGroup;
