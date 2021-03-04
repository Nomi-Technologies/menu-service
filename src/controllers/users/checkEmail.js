const userLogic = require('../../logic/users');
const logger = require('../../utils/logger');

async function checkEmail(req, res) {
  const { email } = req.query;
  try {
    const user = await userLogic.getUserByEmail(email);
    if (user) {
      res.send({ taken: true });
    }
    else {
      res.send({ taken: false });
    }
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while processing this request',
    });
  }
}

module.exports = checkEmail;
