const { User } = require('../../models');

async function updateUserById(userId, newDetails) {
  return User.update(newDetails, {
    where: { 
      id: userId 
    }
  });
};

module.exports = updateUserById;