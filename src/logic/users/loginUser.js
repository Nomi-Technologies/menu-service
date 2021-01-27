const { User } = require('../../models');
const jwt = require("jsonwebtoken");

async function loginUser({ email, password }) {
  const authenticatedUser = User.authenticate(email, password);
  if(authenticatedUser) {
    const payload = { email: authenticatedUser.email };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    return token;
  } else {
    throw Error("Could not authenticate user")
  }
};

module.exports = loginUser;