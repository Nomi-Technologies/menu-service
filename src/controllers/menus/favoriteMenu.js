const userLogic = require('../../logic/users');

async function favoriteMenu(req, res) {
  const { favorite } = req.body;
  const userId = req.user.id;
  const menuId = req.params.id;

  try {
    const user = await userLogic.getUserById(userId);
    if (favorite === true) {
      await userLogic.addFavoriteMenuByUser(user, menuId);
      res.send({
        message: 'Successfully added favorite menu',
      });
    }
    else {
      await userLogic.deleteFavoriteMenuByUser(user, menuId);
      res.send({
        message: 'Successfully unfavorited menu',
      });
    }
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: favorite ? 'Could not favorite menu' : 'Could not unfavorite menu',
    });
  }
}

module.exports = favoriteMenu;
