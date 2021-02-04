async function deleteFavoriteMenuByUser(user, menuId) {
  const favoritedMenu = await user.hasFavoriteMenu(menuId);
  if(favoritedMenu) {
    await user.removeFavoriteMenu(menuId);
    return true;
  }
  return false;
};

module.exports = deleteFavoriteMenuByUser;
