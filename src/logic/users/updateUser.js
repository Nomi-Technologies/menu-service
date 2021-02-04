async function updateUser(user, newDetails) {
  return user.update(newDetails)
};

module.exports = updateUser;
