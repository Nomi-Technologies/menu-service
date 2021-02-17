const userLogic = require('../../logic/users');

async function registerUser(req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    role: req.body.role,
    restaurantId: req.body.restaurantId,
    firstName: req.body.firstname,
    lastName: req.body.lastname
  }

  try {
    const registeredUser = await userLogic.registerUser(user);
    res.send(`User ${registeredUser.email} was successfully created!`);
  } 
  catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = registerUser;
