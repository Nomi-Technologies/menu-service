const menuLogic = require('../../logic/menu');

async function toggleFiltering(req, res) {
  let enableFiltering = req.body.enableFiltering;

  menuLogic.updateMenuById(
    {
      enableFiltering: enableFiltering
    },
    req.params.id
  ).then(() => {
    let message;
    if(enableFiltering === true) {
      message = "filtered enabled"
    } else {
      message = "filtering disabled"
    }
    res.status(200).send({
      message: message
    })
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while updating filtering",
    });
  });
}

module.exports = toggleFiltering;
