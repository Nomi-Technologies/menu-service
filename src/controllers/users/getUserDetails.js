const userLogic = require('../../logic/users');

async function getUserDetails(req, res) {
  const email = req.user.email;

  try {
    const user = await userLogic.getUserByEmail(email)
    res.send(user);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while processing this request",
    });
  }
};

module.exports = getUserDetails;
