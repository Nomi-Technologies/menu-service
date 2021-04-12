const groupLogic = require('../../logic/groups');
const logger = require('../../utils/logger');

async function getGroup(req, res) {
  const { groupId } = req.user;

  try {
    const group = await groupLogic.getGroupById(groupId);
    if (group) {
      res.send(group);
    }
    else {
      res.status(404).send({
        message: 'could not find group for user',
      });
    }
  }
  catch(error) {
    logger.error(error);
    res.status(500).send({
      message: 'error getting group',
    });
  }
}

module.exports = getGroup;
