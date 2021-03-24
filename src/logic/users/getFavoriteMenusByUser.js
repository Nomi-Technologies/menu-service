async function getFavoriteMenusByUser(user) {
  return user.getFavoriteMenus({ attributes: ['id', 'name'] });
}

module.exports = getFavoriteMenusByUser;
