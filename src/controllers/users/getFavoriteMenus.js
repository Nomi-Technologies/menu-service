const userLogic = require('../../logic/users');

async function getFavoriteMenus(req, res) {
  const userId = req.user.id;
  
  try {
    const user = await userLogic.getUserById(userId);
    const favoriteMenus = await userLogic.getFavoriteMenusByUser(user);
    return res.send(favoriteMenus);
  }
  catch(err) {
    console.log(err);
    return res.status(500).send({
      message: "Could not get favorite menus"
    });
  }
}

module.exports = getFavoriteMenus;