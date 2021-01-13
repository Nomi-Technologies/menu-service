const getUserById = require('./getUserById');

async function updateUserById(userId, newDetails) {
  getUserById(userId)
  .then((user) => {
    // verify user belongs to restauraunt of dish to update
    return user.update(newDetails)
  });
};

module.exports = updateUserById;
