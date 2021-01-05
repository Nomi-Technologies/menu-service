const { User } = require('../../models');

async function getUserById(id) {
  return User.findByPk(req.user.id);
}

module.exports = getUserById;
