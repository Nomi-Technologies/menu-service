const userLogic = require('../../logic/users');
<<<<<<< HEAD
=======
const logger = require('../../utils/logger');
>>>>>>> staging

async function updatePassword(req, res) {
  const userId = req.user.id;
  const suppliedPassword = req.body.password;
  const { newPassword } = req.body;

  try {
    const user = await userLogic.getUserById(userId);
    await userLogic.updateUserPassword(user, suppliedPassword, newPassword);
    res.send({
      message: 'password updated successfully',
    });
  }
  catch(err) {
    logger.error(err);
    res.status(500).send({
      message: 'An error occured while updating password',
    });
  }
}

module.exports = updatePassword;
