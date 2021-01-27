const userLogic = require('../../logic/users');

async function checkEmail(req, res) {
  const email = req.query.email;
  try {
    const user = await userLogic.getUserByEmail(email);
    if (user) {
      res.send({ taken: true });
    } else {
      res.send({ taken: false });
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "An error occured while processing this request",
    });
  }
};

module.exports = checkEmail;
