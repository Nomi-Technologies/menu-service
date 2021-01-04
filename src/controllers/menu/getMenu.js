const menuLogic = require('../../logic/menu');

async function getMenu(req, res) {
  const id = req.params.id;
  let userRestaurantId = req.user.restaurantId;
  getMenuByIdAndRestaurantId(id, userRestaurantId)
  .then((menu) => {
    if(menu !== null) {
      res.send(menu);
    } else {
      res.status(404).send()
    }

  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while getting menus list",
    });
  });
};

module.exports = getMenu;
