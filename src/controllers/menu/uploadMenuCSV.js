const menuLogic = require('../../logic/menu');
const { parseCSV } = require("../../util/csv-parser");

// reads csv and creates menu
async function uploadMenuCSV(req, res) {
  parseCSV(
    req.body.data,
    req.user.restaurantId,
    req.params.id,
    req.body.overwrite
  )
    .then((completed) => {
      res.send(completed);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "An error occured while processing this request",
      });
    });
};
