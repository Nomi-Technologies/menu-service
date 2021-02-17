const { User } = require('../../models');

async function updateUserPassword(user, suppliedPassword, newPassword) {
  const authenticatedUser = User.authenticate(user.email, suppliedPassword);
  if(authenticatedUser) {
    return User.updatePassword(authenticatedUser.id, newPassword)
  } else {
    throw Error("Could not authenticate user")
  }
};

module.exports = updateUserPassword;