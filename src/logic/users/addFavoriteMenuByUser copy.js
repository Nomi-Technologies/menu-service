async function addFavoriteMenuByUser(user, menuId) {
  return user.addFavoriteMenu(menuId);
};

module.exports = addFavoriteMenuByUser;
