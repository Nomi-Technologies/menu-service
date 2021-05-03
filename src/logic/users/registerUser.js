const { User } = require('../../models');

async function registerUser(user) {
  // TODO make User.register take in a user object
  return User.register(user);
}

module.exports = registerUser;
