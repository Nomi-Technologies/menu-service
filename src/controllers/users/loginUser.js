const userLogic = require('../../logic/users');

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const token = await userLogic.loginUser({ email, password });
      if (token) {
        res.json({ msg: 'successfully logged in', token });
      }
      else {
        res.status(401).json({ msg: 'Could not authentiate user' });
      }
    }
    catch(error) {
      res.status(500).json({
        msg: 'error logging in',
      });
    }
  }
}

module.exports = loginUser;
