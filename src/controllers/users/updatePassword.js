const userLogic = require('../../logic/users')

async function updatePassword(req, res) {
  const userId = req.user.id;
  const suppliedPassword = req.body.password;
  const newPassword = req.body.newPassword;
  
  try {
    const user = user.getUserById(userId);
    await userLogic.updateUserPassword(user, suppliedPassword, newPassword);
    res.send({
      message: "password updated succesffuly"
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: "An error occured while updating password"
    });
  }
}

module.exports = updatePassword;
