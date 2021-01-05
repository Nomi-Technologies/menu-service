const menuLogic = require('../../logic/menu');
const userLogic = require('../../logic/user');

async function favoriteMenu(req, res) {
  let favorite = req.body.favorite;
  if(favorite === true) {
    userLogic.getUserById(req.user.id).then((user) => {
      return user.addFavoriteMenu(req.params.id);
    }).then(() => {
      res.send({
        message: "Successfully favorited menu"
      })
    }).catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Could not favorite menu"
      })
    })
  } else
  {
    userLogic.getUserById(req.user.id).then((user) => {
      user.hasFavoriteMenu(req.params.id).then((favoritedMenu) => {
        if(favoritedMenu) {
          return user.removeFavoriteMenu(req.params.id)
        }
      }).then(() => {
        res.send({
          message: "Successfully unfavorited menu"
        })
      }).catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Could not unfavorite menu"
        })
      })
    }).catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Could not unfavorite menu"
      })
    })
  }
};

module.exports = favoriteMenu;
