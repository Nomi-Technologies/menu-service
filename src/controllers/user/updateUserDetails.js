const userLogic = require('../../logic/user')

async function updateUserDetails(req, res) {
  // const userId = req.user.id;
  // const newDetails = req.body;
  // User.findOne({ where: { id: userId } })
  // .then((user) => {
  //   // verify user belongs to restauraunt of dish to update
  //   User.update(req.body, { where: { id: userId } }).then(() => {
  //     res.status(200).send({
  //       message: "update sucessful",
  //       user: user,
  //     });
  //   });
  // })
  // .catch((err) => {
  //   console.error(err);
  //   res.status(500).send({
  //     message:
  //       err.message ||
  //       "An error occured while updating user with userId=" + userId,
  //   });
  // });
  return true;
};

module.exports = updateUserDetails;
