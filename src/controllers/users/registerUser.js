const userLogic = require('../../logic/users');
const logger = require('../../utils/logger');

async function registerUser(req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    role: req.body.role,
    groupId: req.body.groupId,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
  };

  try {
    const registeredUser = await userLogic.registerUser(user);
    res.send(`User ${registeredUser.email} was successfully created!`);
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: 'error registering user',
    });
  }
}

module.exports = registerUser;
