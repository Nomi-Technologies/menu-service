const { User } = require('../../models');

async function getUserById(id) {
  return User.getUser({ id })
};

module.exports = getUserById;
