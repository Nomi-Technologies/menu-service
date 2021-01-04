const menuLogic = require('../../logic/menu');

async function deleteMenu(req, res) {
  let userRestaurantId = req.user.restaurantId;
  getMenuById(req.params.id)
    .then((menu) => {
      // verify user belongs to restauraunt of menu to update
      if (menu && menu.restaurantId == userRestaurantId) {
        destroyMenuById(req.params.id)
          .then(
            res.send({
              message: "menu was deleted successfully",
            })
          )
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "An error occured while deleting menu with id=" + req.params.id,
            });
          });
      } else {
        // sends if menu does not exist, or user does not have access
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

module.exports = deleteMenu;
