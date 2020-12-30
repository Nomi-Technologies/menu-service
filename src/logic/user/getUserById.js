const { User } = require('../../models');

async function getUserById(userId) {
  return User.findOne({ where: { id: userId } })
};

module.exports = getUserById;
