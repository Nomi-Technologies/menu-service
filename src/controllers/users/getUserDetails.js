const userLogic = require('../../logic/users');
const logger = require('../../utils/logger');

async function getUserDetails(req, res) {
  const { email } = req.user;

  try {
    const user = await userLogic.getUserByEmail(email);
    res.send(user);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while processing this request',
    });
  }
}

module.exports = getUserDetails;
