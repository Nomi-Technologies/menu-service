const menuLogic = require('../../logic/menu');

async function updateMenu(req, res) {
  let userRestaurantId = req.user.restaurantId;
  getMenuById(req.params.id)
    .then((menu) => {
      // verify menu belongs to restauraunt of menu to update
      if (menu && menu.restaurantId == userRestaurantId) {
        updateMenuById(req.body, req.params.id).then(() => {
          res.status(200).send({
            message: "update sucessful",
          });
        });
      } else {
        // sends if dish does not exist, or user does not have access
        res.status(404).send({
          message: "Could not find menu to update",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occured while updating menu with id=" + req.params.id,
      });
    });
};

module.exports = updateMenu;
