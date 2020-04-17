const db = require("./models");
const Dish = db.Dish;
const User= db.User;

const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
passReqToCallback: true;

// auth strategy
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.getUser({ email: jwt_payload.id })
    .then(user => {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy)



// users
const registerUser = (req, res) => {
  try {
    let newUser = User.register(req.body.email, req.body.password);
    res.send("User " + req.body.email + " was successfully created!");
  } catch (err) {
    res.status(500).send(err);
  }
}

// TODO:
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    let user = await User.authenticate(email, password);
    if(user) {
        let payload = { email: user.email }
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({msg: 'successfully logged in', token: token});
    } else {
      res.status(401).json({msg: "Could not authentiate user"});
    }
  }

}


const createDish = (req, res) => {
  const dish = {
    name: req.body.name
  }

  Dish.create(dish)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while processing this request"
      });
    });
};

const dishesList = (req, res) => {
  Dish.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting dishes list"
      });
    });
};

const getDish = (req, res) => {
  const id = req.params.id;

  Dish.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting dish with id=" + id
      });
    });
};

const updateDish = (req, res) => {
  Dish.update(req.body,
  {
    where: {
      id: req.params.id
    }
  })
  .then(res.send({
    message: "Dish id=" + req.params.id + " updated successfully"
  }))
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating dish with id=" + id
    });
  });
};

const deleteDish = (req, res) => {
  Dish.destroy({
    where: {id: id}
  })
  .then(res.send({
    message: "Dish was deleted successfully"
  }))
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while deleting     dish with id=" + id
    });
  });
};

const getDishForMobile = (req, res) => {

};

module.exports = {
  createDish,
  dishesList,
  getDish,
  updateDish,
  deleteDish,
  getDishForMobile,
  registerUser,
  loginUser,
  passport
}