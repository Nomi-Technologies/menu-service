const { User } = require('../../models');

async function getUserByEmail(email) {
  return User.getUser({ email });
}

module.exports = getUserByEmail;
