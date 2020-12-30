const { User } = require('../../models');
const { getUserById } = require('./getUserById');

async function updateUserById(userId) {
  getUserById(userId)
  .then((user) => {
    // verify user belongs to restauraunt of dish to update
    User.update(req.body, { where: { id: userId } })
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
};

module.exports = updateUserById;
