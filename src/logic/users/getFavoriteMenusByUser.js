// const { User } = require('../../models');

async function getFavoriteMenusByUser(user) {
  // User.getFavoriteMenus(user, { attributes: ['id', 'name'] });
  return user.getFavoriteMenus({ attributes: ['id', 'name'] });
};

module.exports = getFavoriteMenusByUser;
