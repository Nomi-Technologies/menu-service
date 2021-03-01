const userLogic = require('../../logic/users');

async function getUserDetails(req, res) {
  const { email } = req.user;

  try {
    console.log('email');
    console.log(email);
    const user = await userLogic.getUserByEmail(email);
    console.log('user');
    console.log(user);
    res.send(user);
  }
  catch(err) {
    console.error(err);
    res.status(500).send({
      message: err.message || 'An error occured while processing this request',
    });
  }
}

module.exports = getUserDetails;
