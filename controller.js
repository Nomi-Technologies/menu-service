const {
  Dish,
  Tag,
  User,
  Restaurant,
  Category,
  Menu
} = require("./models");

const slug = require('slug');

const {
  JWT_SECRET,
  BUCKET_NAME,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
} = require("./config.js");
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

const passport = require("passport");
const passportJWT = require("passport-jwt");

const aws = require("aws-sdk");
aws.config.update({
  region: "us-west-1",
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = JWT_SECRET;
passReqToCallback: true;

// auth strategy
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.getUser({ email: jwt_payload.email }).then((user) => {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

// users
const registerUser = async (req, res) => {

  try {
    user = await User.register(
      req.body.email,
      req.body.password,
      req.body.phone,
      req.body.role,
      req.body.restaurantId,
      req.body.firstname,
      req.body.lastname
    );
    res.send("User " + user.email + " was successfully created!");
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
};

const checkEmail = (req, res) => {
  User.findAndCountAll({
    where: { email: req.query.email }
  }).then((result) => {
    if(result.count > 0) {
      res.send({taken: true});
    } else {
      res.send({taken: false});
    }
  })
}


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    let user = await User.authenticate(email, password);
    if (user) {
      let payload = { email: user.email };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: "successfully logged in", token: token });
    } else {
      res.status(401).json({ msg: "Could not authentiate user" });
    }
  }
};

const getUserDetails = async (req, res) => {
  User.getUser({ email: req.user.email })
  .then((user) => {
    res.send(user)
  })  
  .catch((err) => {
    console.error(err)
    res.status(500).send({
      message:
        err.message ||
        "An error occured creating while processing this request",
    });
  });
}

const updateUserDetails = async (req, res) => {
  email = req.user.email

  User.findOne({ where: { email: email }})
  .then((user) => {
    // verify user belongs to restauraunt of dish to update
    user.update(req.body, { where: { email: email } }).then(() => {
      res.status(200).send({
        message: "update sucessful",
        user: user
      });
    });
  })
  .catch((err) => {
    console.error(err)
    res.status(500).send({
      message:
        err.message || "An error occured while updating user with email=" + email,
    });
  });  
}

// Restaurants
const createRestaurant = async (req, res) => {
  const restaurant = {
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    url: req.body.url,
  };

  const uniqueNameBase = slug(restaurant.name);
  let uniqueName = uniqueNameBase;
  let retries = 0;
  let collision = await Restaurant.findAll({ where: { uniqueName: uniqueName }});
  while (collision.length > 0) {
    uniqueName = `${uniqueNameBase}-${++retries}`;
    collision = await Restaurant.findAll({ where: { uniqueName: uniqueName }});
  }

  restaurant.uniqueName = uniqueName;
  restaurant.published = true; // temp until we set up publishing

  Restaurant.create(restaurant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          err.message ||
          "An error occured creating while processing this request",
      });
    });
};

// gets restaurant information based on authentication
const getRestaurant = (req, res) => {
  userRestaurantId = req.params.restaurantId;
  Restaurant.findOne({ id: userRestaurantId })
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          err.message ||
          "An error occured while getting restaurant with restaurant_id=" +
            userRestaurantId,
      });
    });
};

const updateRestaurant = (req, res) => {
  userRestaurantId = req.user.restaurantId;
  Restaurant.findByPk(userRestaurantId)
    .then((restaurant) => {
      Restaurant.update(req.body, { where: { id: userRestaurantId } }).then(
        () => {
          res.status(200).send({
            message: "update sucessful",
          });
        }
      );
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          err.message ||
          "An error occured while updating restaurant with restaurant_id=" +
            userRestaurantId,
      });
    });
};

// Dishes
// TODO: Get user from auth and get restaurant from user
const createDish = (req, res) => {
  const dishData = {
    name: req.body.name,
    description: req.body.description,
    addons: req.body.addons,
    canRemove: req.body.canRemove,
    notes: req.body.notes,
    tableTalkPoints: req.body.tableTalkPoints,
    restaurantId: req.user.restaurantId,
    categoryId: req.body.restaurantId,
    menuId: req.body.menuId,
  }
  Dish.create(dishData)
    .then((dish) => {
      dish.setTags(req.body.dishTags).then(() => {
        dish.setCategory(req.body.categoryId).then((data) => {
          res.send(data);
        })
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message: err.message || "Dish could not be created"
      });
    });
};

// reads csv and creates menu
const uploadMenuCSV = (req, res) => {
  CsvHelper(req)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: err.message || "An error occured while processing this request"
    });
  });
}

async function CsvHelper(req) {
  var userRestaurantId = req.user.restaurantId
  var dataArr = req.body.data;
  var dish, dishcategory;
  for(let i = 0; i < dataArr.length; i++){
    dishcategory = await Category.findCreateFind({
      where: {
        name: dataArr[i][0],
        restaurantId: userRestaurantId
      }
    })
    dish = await Dish.create({
      name: dataArr[i][1],
      description: dataArr[i][2],
      addons: dataArr[i][3],
      canRemove: dataArr[i][1],
      notes: dataArr[i][11],
      tableTalkPoints: dataArr[i][12],
      restaurantId: userRestaurantId,
    })
    dish.setCategory(dishcategory[0]);
    addTags(dish, dataArr[i][5])
  }
};

async function addTags(dish, allergens){
  let allergenlist = allergens.split(",");
  for(let j = 0; j < allergenlist.length; j++){
    let tag = await Tag.findCreateFind({
      where: {
        name: capitalizeFirstLetter(allergenlist[j].trim())
      }
    })
    dish.addTag(tag[0]);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const tagsList = (req, res) => {
  Tag.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: err.message || "An error occured while getting tags list"
    })
  })
}

const dishesByCategory = (req, res) => {
  userRestaurantId = req.user.restaurantId;
  Category.findAll({
    where: { restaurantId: userRestaurantId },
    include: [{ model: Dish, include: [{ model: Tag }] }]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          err.message || "An error occured while getting categories list",
      });
    });
};

const getTags = (req, res) => {
  Tag.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: err.message || "An error occured while getting tags with restaurant=" + restaurantId
    })
  })
}

const getDish = (req, res) => {
  const id = req.params.id
 
  Dish.findByPk(id, {
    include: {
      model: Tag, as: 'Tags'
    }
  })
    .then(dish => {
      // verify user belongs to restauraunt of dish requested
      res.send(dish);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          err.message || "An error occured while getting dish with id=" + id,
      });
    });
};

const updateDish = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Dish.findByPk(req.params.id)
    .then((dish) => {
      // verify user belongs to restauraunt of dish to update
      if (dish) {
        Dish.update(req.body, { where: { id: req.params.id } }).then(() => {
          dishTags = req.body.dishTags
          dish.setTags(dishTags).then(() => {
            res.status(200).send({
              message: "dish update successful",
            });
          })

          .catch((err) => {
            console.error(err)
            res.status(500).send({
              message:
                err || "An error occured while updating dish with id=" + id,
            });
          })

        }).catch((err) => {
          console.error(err)
          res.status(500).send({
            message:
              err.message || "An error occured while updating dish with id=" + id,
          });
        });
      } else {
        // sends if dish does not exist, or user does not have access
        res.status(404).send({
          message: "Could not find dish to update",
        });
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          err.message || "An error occured while updating dish with id=" + id,
      });
    })
};

const deleteDish = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Dish.findByPk(req.params.id)
  .then(dish => {
    // verify user belongs to restauraunt of dish to update
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
      })
    }
  })
}

const getMenuDishes = (req, res) => {
  userRestaurantId = req.user.restaurantId;
  userMenuId = req.params.menuId;
  Category.findAll({
    where: { restaurantId: userRestaurantId, menuId: userMenuId },
    include: [{ model: Dish, include: [{ model: Tag }] }]
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "An error occured while getting categories list",
    });
  });
}
const dishesByName = (req, res) => {
  userRestaurantId = req.user.restaurantId;
  let searchValue = '%' + req.query.searchInput + '%';
  Dish.findAll({
    where: { 
      name: {
        [Op.like]: searchValue
      },
      restaurantId: userRestaurantId, 
    },
    include: [{model: Tag}, {model: Category}],
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "An error occured while searching for dish",
    });
  });
}

//Categories
const createCategory = (req, res) => {
  const category = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    menuId: req.body.menuId, 
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
  Category.findByPk(req.params.id)
  .then(category => {
    if(category) {
      Category.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.status(200).send({
          message: "update sucessful"
        })
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

const deleteCategory = (req, res) => {
  Category.findByPk(req.params.id)
  .then(category => {
    // verify user belongs to restauraunt of category to update
    if(category) {
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
  Category.findByPk(req.params.id)
    .then(category => {
      // TODO: some sort of verification
      res.send(category);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting category with id=" + id
      });
    });
};

//Menus
const createMenu = (req, res) => {
  console.log("in create menu")
  const menu = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
  }

  Menu.create(menu)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Menu could not be created"
      });
    });
};

const updateMenu = (req, res) => {
  console.log("in update menu")
  userRestaurantId = req.user.restaurantId
  Menu.findByPk(req.params.id)
  .then(menu => {
    // verify menu belongs to restauraunt of menu to update
    if(menu && menu.restaurantId == userRestaurantId) {
      console.log(req)
      Menu.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.status(200).send({
          message: "update sucessful"
        })
      });
    }
    else {
      // sends if dish does not exist, or user does not have access
      res.status(404).send({
        message: "Could not find menu to update"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating menu with id=" + req.params.id
    });
  });
};

const getMenu = (req, res) => {
  const id = req.params.id
  userRestaurantId = req.user.restaurantId
  Menu.findOne({
      where: { restaurantId: userRestaurantId, id: id },
      include: [{ model: Category, include: [{ model: Dish, as: "Dishes", include: [{ model: Tag, as: "Tags" }] }] }] ,
      order: [
        [Category, 'updatedAt', 'asc']
      ]
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message:
          err.message || "An error occured while getting menus list",
      });
    });
};

const deleteMenu = (req, res) => {
  console.log("in delete menu")
  userRestaurantId = req.user.restaurantId
  Menu.findByPk(req.params.id)
  .then(menu => {
    // verify user belongs to restauraunt of menu to update
    console.log(menu)
    if(menu && menu.restaurantId == userRestaurantId) {
      Menu.destroy({
        where: {id: req.params.id}
      })
      .then(res.send({
        message: "menu was deleted successfully"
      }))
      .catch(err => {
        res.status(500).send({
          message: err.message || "An error occured while deleting menu with id=" + req.params.id
        });
      });
    }
    else {
      // sends if menu does not exist, or user does not have access
      res.status(404).send({
        message: "Could not find menu to update"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating menu with id=" + req.params.id
    });
  });
};

const getAllMenus = (req, res) => {
  userRestaurantId = req.user.restaurantId
  Menu.findAll({
    where: { restaurantId: userRestaurantId },
    //include: [{ model: Category, include: [{ model: Dish, include: [{ model: Tag }] }] }]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occured while getting menus list",
      });
    });
}

const fetchAsset = async (req, res) => {
  let path = req.params[0];
  s3.getObject(
    {
      Bucket: BUCKET_NAME,
      Key: `assets/${path}`,
    },
    (err, data) => {
      if (err) {
        res.status(err.statusCode).send(err.message);
      } else {
        res.setHeader("Content-Type", "image/png");
        res.send(data.Body);
      }
    }
  );
};

const publicMenuList = (req, res) => {
  let uniqueName = req.params.uniqueName;
  Menu.findAll({
    include: [
      { model: Restaurant, where: { uniqueName: uniqueName } }
    ],
    where: {
      published: true
    }
  }).then((menuList) => {
    res.send(menuList)
  })
}

const publicDishList = (req, res) => {
  let uniqueName = req.params.uniqueName;
  let menuId = req.params.menuId
  Dish.findAll({
    attributes: ["id", "name", "description", "addons", "canRemove"],
    include: [
      { model: Tag, as: "Tags" }, 
      { model: Category, where: { menuId: menuId } }, 
      { model: Restaurant, where: { uniqueName: uniqueName } }
    ],
    order: [
      [Category, 'createdAt', 'asc'],
    ]
  })
    .then((data) => res.send(data))
    .catch((err) => 
      res.status(500).send({
        message: err.message || "An error occured while getting dishes list",
      })
    );
};

const publicRestaurantList = (req, res) => {
  res.send("[]");
};

module.exports = {
  createDish,
  dishesByCategory,
  getDish,
  updateDish,
  deleteDish,
  dishesByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  passport,
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  fetchAsset,
  publicDishList,
  publicRestaurantList,
  uploadMenuCSV,
  updateCategory,
  publicRestaurantList,
  checkEmail,
  getTags,
  createMenu,
  updateMenu,
  getMenu,
  deleteMenu,
  getAllMenus,
  getMenuDishes,
  publicMenuList
}
