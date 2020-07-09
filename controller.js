const {
  Dish,
  Tag,
  User,
  Restaurant,
  Category
} = require("./models");

const {
  JWT_SECRET,
  BUCKET_NAME,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY
} = require('./config.js');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');

const aws = require('aws-sdk');
aws.config.update({
  region: 'us-west-1',
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY
});
const s3 = new aws.S3();

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
    User.register(req.body.email, req.body.password, req.body.phone, req.body.role, req.body.restaurantId)
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
    restaurantId: req.user.restaurantId,         // register to user's restaurant
    categoryId: req.body.categoryId,
  }
  console.log(dish)
  
  Dish.create(dish)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Dish could not be created"
      });
    });
};

const dishesList = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Dish.findAll({
    where: {restaurantId: userRestaurantId},
    include: [{ model: Tag }, { model: Category }]
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

const dishesByCategory = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Category.findAll({
    where: {restaurantId: userRestaurantId},
    include: [{model: Dish, include: [{model: Tag}]}]
  })
    .then(data => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting categories list"
      });
    });
}

const getDish = (req, res) => {
  const id = req.params.id
  userRestaurantId = req.user.restaurantId
 
  Dish.findByPk(id)
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
  Dish.findByPk(req.params.id)
  .then(dish => {
    // verify user belongs to restauraunt of dish to update
    if(dish && dish.restaurantId == userRestaurantId) {
      console.log(req)
      Dish.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.status(200).send({
          message: "update sucessful"
        })
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
      message: err.message || "An error occured while updating dish with id=" + req.params.id
    });
  });
};

const deleteDish = (req, res) => {
  console.log("in delete dish")
  userRestaurantId = req.user.restaurantId
  Dish.findByPk(req.params.id)
  .then(dish => {
    // verify user belongs to restauraunt of dish to update
    console.log(dish)
    if(dish && dish.restaurantId == userRestaurantId) {
      Dish.destroy({
        where: {id: req.params.id}
      })
      .then(res.send({
        message: "Dish was deleted successfully"
      }))
      .catch(err => {
        res.status(500).send({
          message: err.message || "An error occured while deleting dish with id=" + req.params.id
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
      message: err.message || "An error occured while updating dish with id=" + req.params.id
    });
  });

};

//Categories
const createCategory = (req, res) => {
  const category = {
    name: req.body.name,
    restaurantId: req.user.restaurantId, 
  }

  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Category could not be created"
      });
    });
};

const updateCategory = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Category.findByPk(req.params.id)
  .then(category => {
    // verify category belongs to restauraunt of category to update
    if(category && category.restaurantId == userRestaurantId) {
      console.log(req)
      Category.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.status(200).send({
          message: "update sucessful"
        })
      });
    }
    else {
      // sends if dish does not exist, or user does not have access
      res.status(404).send({
        message: "Could not find category to update"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating category with id=" + req.params.id
    });
  });
};

const deleteCategory = (req, res) => {
  console.log("in delete category")
  userRestaurantId = req.user.restaurantId
  Category.findByPk(req.params.id)
  .then(category => {
    // verify user belongs to restauraunt of category to update
    console.log(category)
    if(category && category.restaurantId == userRestaurantId) {
      Category.destroy({
        where: {id: req.params.id}
      })
      .then(res.send({
        message: "category was deleted successfully"
      }))
      .catch(err => {
        res.status(500).send({
          message: err.message || "An error occured while deleting category with id=" + req.params.id
        });
      });
    }
    else {
      // sends if category does not exist, or user does not have access
      res.status(404).send({
        message: "Could not find category to update"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating category with id=" + req.params.id
    });
  });

};

const getCategory = (req, res) => {
  const id = req.params.id
  userRestaurantId = req.user.restaurantId
 
  Category.findByPk(id)
    .then(category => {
      // verify user belongs to restauraunt of category requested
      if(category && category.restaurantId == userRestaurantId) {
        res.send(category);
      }
      else {
        res.status(404).send({
          message: "Could not find category"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting category with id=" + id
      });
    });
};

const fetchAsset = async (req, res) => {
  let path = req.params[0];
  s3.getObject({
    Bucket: BUCKET_NAME,
    Key: `assets/${path}`
  }, (err, data) => {
    if (err) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.setHeader('Content-Type', 'image/png');
      res.send(data.Body);
    }
  });
};

const publicDishList = (req, res) => {
  let restaurantId = req.params.restaurantId;
  Dish.findAll({
    attributes: ['id', 'name', 'description', 'addons', 'canRemove'],
    where: { restaurantId: restaurantId },
    include: [{ model: Tag }, { model: Category }],
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "An error occured while getting dishes list"
    }));
};

const publicRestaurantList = (req, res) => {
  res.send('[]');
};

module.exports = {
  createDish,
  dishesList,
  dishesByCategory,
  getDish,
  updateDish,
  deleteDish,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  registerUser,
  loginUser,
  passport,
  createRestaurant,
  fetchAsset,
  publicDishList,
  publicRestaurantList,
}