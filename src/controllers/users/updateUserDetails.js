const userLogic = require('../../logic/users')

async function updateUserDetails(req, res) {
  const userId = req.user.id;
  const newDetails = req.body;
  
  try {
    const user = await userLogic.getUserById(userId);
    const userUpdated = await userLogic.updateUser(user, newDetails)
    res.status(200).send({
      message: "update sucessful",
      user: userUpdated,
    });
    return true;
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while updating user with userId=" + userId,
    });
  }
};

module.exports = updateUserDetails;
