const userLogic = require('../../logic/user')

// update user by id in one function
async function updateUserDetails(req, res) {
  const userId = req.user.id;
  const newDetails = req.body;
  
  userLogic.updateUserById(userId, newDetails)
  .then((user) => {
    res.status(200).send({
      message: "update sucessful",
      user: user,
    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while updating user with userId=" + userId,
    });
  });

  return true;
};

// get user, then call updateUser on that user
async function updateUserDetails2(req, res) {
  const userId = req.user.id;
  const newDetails = req.body;
  
  userLogic.getUserById(userId)
  .then((user) => {
    userLogic.updateUser(user, newDetails)
    .then(() => {
      res.status(200).send({
        message: "update sucessful",
        user: user,
      });
    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while updating user with userId=" + userId,
    });
  });

  return true;
};

// modern await syntax
async function updateUserDetails3(req, res) {
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
