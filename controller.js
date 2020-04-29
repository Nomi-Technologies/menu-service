const {
  Dish,
  Tag,
  User,
  Restaurant
} = require("./models");

const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');

const { JWT_SECRET } = require('./config.js')
// import { JWT_SECRET } from './config.js';

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = JWT_SECRET;
passReqToCallback: true;

// auth strategy
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.getUser({ email: jwt_payload.email })
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
    let newUser;
    User.register(req.body.email, req.body.password, req.body.phone, req.body.role)
      .then((user) => {
          res.send("User " + user.email + " was successfully created!");
      });
    
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

// Restaurants
const createRestaurant = (req, res) => {
  const restaurant = {
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    url: req.body.url
  }

  Restaurant.create(restaurant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured creating while processing this request"
      });
    });
}

// gets restaurant information based on authentication
// const getRestaurant = (req, res) => {

// }


// Dishes
// TODO: Get user from auth and get restaurant from user
const createDish = (req, res) => {
  const dish = {
    name: req.body.name,
    description: req.body.description,
    addons: req.body.addons,
    canRemove: req.body.canRemove,
    notes: req.body.notes,
    tableTalkPoints: req.body.tableTalkPoints,
    restaurantId: req.user.restaurantId         // register to user's restaurant
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
  userRestaurantId = req.user.restaurantId
  Dish.findAll({
    where: {restaurantId: userRestaurantId},
    include: [{ model: Tag }]
  })
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

  userRestaurantId = req.user.restaurantId
  Dish.findByPk(id, {
      include: [{ model: Tag }]
  })
    .then(dish => {
      // verify user belongs to restauraunt of dish requested
      if(dish && dish.restaurantId == userRestaurantId) {
        res.send(dish);
      }
      else {
        res.status(404).send({
          message: "Could not find dish"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting dish with id=" + id
      });
    });
};

const updateDish = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Dish.findByPk(req.id)
  .then(dish => {
    // verify user belongs to restauraunt of dish to update
    if(dish && dish.restaurantId == userRestaurantId) {
      dish.updateDish(req.body);
    }
    else {
      // sends if dish does not exist, or user does not have access
      res.status(404).send({
        message: "Could not find dish to update"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating dish with id=" + id
    });
  });
};

const deleteDish = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Dish.findByPk(req.id)
  .then(dish => {
    // verify user belongs to restauraunt of dish to update
    if(dish && dish.restaurantId == userRestaurantId) {
      Dish.destroy({
        where: {id: id}
      })
      .then(res.send({
        message: "Dish was deleted successfully"
      }))
      .catch(err => {
        res.status(500).send({
          message: err.message || "An error occured while deleting dish with id=" + id
        });
      });
    }
    else {
      // sends if dish does not exist, or user does not have access
      res.status(404).send({
        message: "Could not find dish to update"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating dish with id=" + id
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
  passport,
  createRestaurant
}