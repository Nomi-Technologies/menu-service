const { User } = require('../../models');

async function registerUser(user) {
  const userInfo = Object.values(user);
  // TODO make User.register take in a user object
  return User.register(...userInfo);
}

module.exports = registerUser;
