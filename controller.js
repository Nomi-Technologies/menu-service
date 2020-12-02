const { Dish, Tag, User, Restaurant, Category, Menu, FavoriteMenu } = require("./models");

const { parseCSV, menuToCSV, getOrCreateCategory } = require("./util/csv-parser");
const { getStaticFile, getFile, uploadFile } = require('./util/aws-s3-utils');

const slug = require("slug");

const { JWT_SECRET } = require("./config.js");
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

const passport = require("passport");
const passportJWT = require("passport-jwt");

const caseless = require("caseless");

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
module.exports.passport = passport;

// users
module.exports.registerUser = async (req, res) => {
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
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports.checkEmail = (req, res) => {
  User.findAndCountAll({
    where: { email: req.query.email },
  }).then((result) => {
    if (result.count > 0) {
      res.send({ taken: true });
    } else {
      res.send({ taken: false });
    }
  });
};

module.exports.loginUser = async (req, res) => {
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
};``

module.exports.getUserDetails = async (req, res) => {
  User.getUser({ email: req.user.email })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "An error occured creating while processing this request",
      });
    });
};

module.exports.updateUserDetails = async (req, res) => {
  userId = req.user.id;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      // verify user belongs to restauraunt of dish to update
      User.update(req.body, { where: { id: userId } }).then(() => {
        res.status(200).send({
          message: "update sucessful",
          user: user,
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "An error occured while updating user with userId=" + userId,
      });
    });
};

module.exports.updatePassword = async (req, res) => {
  let userId = req.user.id;
  let suppliedPassword = req.body.password
  User.findOne({ where: { id: userId } }).then((user) => {
    // test supplied password
    return User.authenticate(user.email, suppliedPassword)
  }).then(authenticatedUser => {
    if(authenticatedUser) {
      return User.updatePassword(authenticatedUser.id, req.body.newPassword)
    } else {
      throw Error("Could not authenticate user")
    }
  }).then(() => {
    res.send({
      message: "password updated succesffuly"
    })
  }).catch(() => {
    res.status(500).send({
      message: "An error occured while updating password"
    })
  })
}

// Restaurants
module.exports.createRestaurant = async (req, res) => {
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
  let collision = await Restaurant.findAll({
    where: { uniqueName: uniqueName },
  });
  while (collision.length > 0) {
    uniqueName = `${uniqueNameBase}-${++retries}`;
    collision = await Restaurant.findAll({ where: { uniqueName: uniqueName } });
  }

  restaurant.uniqueName = uniqueName;
  restaurant.published = true; // temp until we set up publishing

  Restaurant.create(restaurant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "An error occured creating while processing this request",
      });
    });
};

// gets restaurant information based on authentication
module.exports.getRestaurant = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  Restaurant.findByPk(userRestaurantId)
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "An error occured while getting restaurant with restaurant_id=" +
            userRestaurantId,
      });
    });
};

module.exports.updateRestaurant = (req, res) => {
  let userRestaurantId = req.params.id;
  Restaurant.findByPk(userRestaurantId)
    .then((restaurant) => {
      return Restaurant.update(req.body, { where: { id: userRestaurantId } })
    }).then(
      () => {
        res.status(200).send({
          message: "update sucessful",
        });
      }
    )
    .catch((err) => {
      console.error(err);
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
module.exports.createDish = (req, res) => {
  const dishData = {
    name: req.body.name,
    description: req.body.description,
    addons: req.body.addons,
    canRemove: req.body.canRemove,
    notes: req.body.notes,
    tableTalkPoints: req.body.tableTalkPoints,
    restaurantId: req.user.restaurantId,
    categoryId: req.body.categoryId,
    menuId: req.body.menuId,
    price: req.body.price,
  };
  Dish.create(dishData)
    .then((dish) => {
      dish.setTags(req.body.dishTags).then(() => {
        dish.setCategory(req.body.categoryId).then((data) => {
          res.send(data);
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: err.message || "Dish could not be created",
      });
    });
};

module.exports.bulkCreateDish = async (req, res) => {
  let ids = req.body.ids;

  const menuData = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    published: true,
  };

  Menu.create(menuData).then(async (menu) => {
    return new Promise(async (resolve, reject) => {
      try {
        for(let i = 0; i < ids.length; i++) {
          let id = ids[i];
          let originalDish = await Dish.findByPk(id, {
            include: [
              { model: Category, attributes: ["name"] },
              { model: Tag, as: "Tags", attributes: ["id"] },
            ]
          })
          let categoryId = await getOrCreateCategory(originalDish.Category.name, menu.id)
          const dishData = {
            name: originalDish.name,
            description: originalDish.description,
            addons: originalDish.addons,
            canRemove: originalDish.canRemove,
            notes: originalDish.notes,
            tableTalkPoints: originalDish.tableTalkPoints,
            restaurantId: originalDish.restaurantId,
            categoryId: categoryId,
            menuId: menu.id,
            price: originalDish.price,
          };
  
          tagIds = [];
          originalDish.Tags.forEach((tag) => {
            tagIds.push(tag.id);
          });
  
          let dish = await Dish.create(dishData)
          await dish.setTags(tagIds)
        }
        resolve(menu);
      } catch (error) {
        await menu.destroy()
        reject(error)
      }
      
    })
  }).then((menu) => {
    res.send(menu);
  }).catch(_ => {
    res.status(500).send({
      "message": "there was an error creating a new menu with selected dishes"
    })
  })
};

// reads csv and creates menu
module.exports.uploadMenuCSV = (req, res) => {
  parseCSV(
    req.body.data,
    req.user.restaurantId,
    req.params.id,
    req.body.overwrite
  )
    .then((completed) => {
      res.send(completed);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "An error occured while processing this request",
      });
    });
};

module.exports.favoriteMenu = (req, res) => {
  let favorite = req.body.favorite
  if(favorite === true) {
    User.findByPk(req.user.id).then((user) => {
      return user.addFavoriteMenu(req.params.id);
    }).then(() => {
      res.send({
        message: "Successfully favorited menu"
      })
    }).catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Could not favorite menu"
      })
    })
  } else 
  {
    User.findByPk(req.user.id).then((user) => {
      user.hasFavoriteMenu(req.params.id).then((favoritedMenu) => {
        if(favoritedMenu) {
          return user.removeFavoriteMenu(req.params.id)
        }
      }).then(() => {
        res.send({
          message: "Successfully unfavorited menu"
        })
      }).catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Could not unfavorite menu"
        })
      })
    }).catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Could not unfavorite menu"
      })
    })
  }
};

module.exports.getFavoriteMenus = (req, res) => {
  User.findByPk(req.user.id).then((user) => {
    return user.getFavoriteMenus({attributes: ['id', 'name']})
  }).then((favoriteMenus) => {
    res.send(favoriteMenus);
  }).catch((err) => {
    console.log(err);
    res.status(500).send({
      message: "Could not get favorite menus"
    })
  })
}

module.exports.tagsList = (req, res) => {
  Tag.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: err.message || "An error occured while getting tags list",
      });
    });
};

module.exports.dishesByCategory = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  Category.findAll({
    include: [
      { model: Dish, include: [{ model: Tag, as: "Tags" }] },
      { model: Menu, where: { restaurantId: userRestaurantId } },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "An error occured while getting categories list",
      });
    });
};

module.exports.getTags = (req, res) => {
  Tag.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "An error occured while getting tags with restaurant=" + restaurantId,
      });
    });
};

module.exports.getDish = (req, res) => {
  const id = req.params.id;

  Dish.findByPk(id, {
    include: {
      model: Tag,
      as: "Tags",
    },
  })
    .then((dish) => {
      // verify user belongs to restauraunt of dish requested
      res.send(dish);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "An error occured while getting dish with id=" + id,
      });
    });
};

module.exports.updateDish = (req, res) => {
  Dish.findByPk(req.params.id)
    .then((dish) => {
      // verify user belongs to restauraunt of dish to update
      if (dish) {
        Dish.update(req.body, { where: { id: req.params.id } })
          .then(() => {
            dishTags = req.body.dishTags;
            dish
              .setTags(dishTags)
              .then(() => {
                res.status(200).send({
                  message: "dish update successful",
                });
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send({
                  message:
                    err || "An error occured while updating dish with id=" + id,
                });
              });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send({
              message:
                err.message ||
                "An error occured while updating dish with id=" + id,
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
      console.error(err);
      res.status(500).send({
        message:
          err.message || "An error occured while updating dish with id=" + id,
      });
    });
};

module.exports.bulkDeleteDish = (req, res) => {
  let dishIds = req.body.dishesToDelete;

  Dish.destroy({
    where: { id: dishIds }
  }).then(
    res.send({
      message: "Dishes were deleted successfully",
    })
  ).catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        "An error occured while deleting dishes",
    });
  });
};

module.exports.deleteDish = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  Dish.findByPk(req.params.id).then((dish) => {
    // verify user belongs to restauraunt of dish to update
    if (dish && dish.restaurantId == userRestaurantId) {
      Dish.destroy({
        where: { id: req.params.id },
      })
        .then(
          res.send({
            message: "Dish was deleted successfully",
          })
        )
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "An error occured while deleting dish with id=" + req.params.id,
          });
        });
    }
  });
};

module.exports.dishesByName = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  let searchValue = "%" + req.query.searchInput + "%";
  Dish.findAll({
    where: {
      name: {
        [Op.iLike]: searchValue,
      },
      restaurantId: userRestaurantId,
    },
    include: [
      { model: Tag, as: "Tags" },
      { model: Category, where: { menuId: req.query.menuId }, attributes: [] },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message + "An error occured while searching for dish",
      });
    });
};

//Categories
module.exports.createCategory = (req, res) => {
  Category.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Category could not be created",
      });
    });
};

module.exports.updateCategory = (req, res) => {
  Category.findByPk(req.params.id)
    .then((category) => {
      if (category) {
        Category.update(req.body, { where: { id: req.params.id } }).then(() => {
          res.status(200).send({
            message: "update sucessful",
          });
        });
      } else {
        // sends if category does not exist, or user does not have access
        res.status(404).send({
          message: "Could not find category to update",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occured while updating category with id=" + req.params.id,
      });
    });
};

module.exports.deleteCategory = (req, res) => {
  Category.findByPk(req.params.id)
    .then((category) => {
      // verify user belongs to restauraunt of category to update
      if (category) {
        Category.destroy({
          where: { id: req.params.id },
        })
          .then(
            res.send({
              message: "category was deleted successfully",
            })
          )
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "An error occured while deleting category with id=" +
                  req.params.id,
            });
          });
      } else {
        // sends if category does not exist, or user does not have access
        res.status(404).send({
          message: "Could not find category to update",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occured while updating category with id=" + req.params.id,
      });
    });
};

module.exports.getCategory = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id)
    .then((category) => {
      // TODO: some sort of verification
      res.send(category);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occured while getting category with id=" + id,
      });
    });
};

module.exports.getAllCategoriesByMenu = (req, res) => {
  const menuId = req.params.menuId;
  Category.findAll({
    where: { menuId: menuId },
  })
    .then((category) => {
      // TODO: some sort of verification
      res.send(category);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occured while getting category with id=" + id,
      });
    });
};

//Menus
module.exports.createMenu = async (req, res) => {
  const menuData = {
    name: req.body.name,
    restaurantId: req.user.restaurantId,
    published: true,
  };

  try {
    const menu = await Menu.create(menuData)
    if(req.body.csv) {
      try {
        await parseCSV(req.body.csv, req.user.restaurantId, menu.id, req.body.overwrite)
      } catch (err) {
        // if there's an error, clean up the menu that was created
        await Menu.destroy({where: {id: menu.id}})
        res.status(500).send({
          message: err.message || "Menu could not be created with supplied .csv file",
        });
        return
      }
    }

    res.send(menu)
  } catch(err) {
    res.status(500).send({
      message: err.message || "Menu could not be created",
    });
  }
};

module.exports.updateMenu = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  Menu.findByPk(req.params.id)
    .then((menu) => {
      // verify menu belongs to restauraunt of menu to update
      if (menu && menu.restaurantId == userRestaurantId) {
        Menu.update(req.body, { where: { id: req.params.id } }).then(() => {
          res.status(200).send({
            message: "update sucessful",
          });
        });
      } else {
        // sends if dish does not exist, or user does not have access
        res.status(404).send({
          message: "Could not find menu to update",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occured while updating menu with id=" + req.params.id,
      });
    });
};

module.exports.toggleFiltering = (req, res) => {
  let enableFiltering = req.body.enableFiltering === 'true'
  Menu.update(
    {
      enableFiltering: enableFiltering
    }, 
    { 
      where: { id: req.params.id } 
    }
  ).then(() => {
    let message;
    if(enableFiltering === true) {
      message = "filtered enabled"
    } else {
      message = "filtering disabled"
    }
    res.status(200).send({
      message: message
    })
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while updating filtering",
    });
  });
}

module.exports.getMenu = (req, res) => {
  const id = req.params.id;
  let userRestaurantId = req.user.restaurantId;
  Menu.findOne({
    where: { restaurantId: userRestaurantId, id: id },
    include: [
      {
        model: Category,
        include: [
          { model: Dish, as: "Dishes", include: [{ model: Tag, as: "Tags" }] },
        ],
      },
    ],
    order: [[Category, "updatedAt", "asc"]],
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occured while getting menus list",
    });
  });
};

module.exports.deleteMenu = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  Menu.findByPk(req.params.id)
    .then((menu) => {
      // verify user belongs to restauraunt of menu to update
      if (menu && menu.restaurantId == userRestaurantId) {
        Menu.destroy({
          where: { id: req.params.id },
        })
          .then(
            res.send({
              message: "menu was deleted successfully",
            })
          )
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "An error occured while deleting menu with id=" + req.params.id,
            });
          });
      } else {
        // sends if menu does not exist, or user does not have access
        res.status(404).send({
          message: "Could not find menu to update",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occured while updating menu with id=" + req.params.id,
      });
    });
};

module.exports.duplicateMenu = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  Menu.findByPk(req.params.id,
    {include: [
        {
          model: Category,
          include: [
            { model: Dish, as: "Dishes", include: [{ model: Tag, as: "Tags" }] },
          ],
        },
      ],
      order: [[Category, "updatedAt", "asc"]],
    }
  )
  .then((oldMenu) => {
    // verify user belongs to restauraunt of menu to update
    if (oldMenu && oldMenu.dataValues.restaurantId == userRestaurantId) {
      Menu.create({
        name: oldMenu.dataValues.name + ' Copy',
        restaurantId: req.user.restaurantId,
        published: true
      }).then((newMenu) => {
          //duplicate all categories with menuId = menu.dataValues.id, use new menuId
          duplicateCategoriesAndDishes(oldMenu, newMenu)
          .then(() => {
            res.send({
              message: "menu was duplicated successfully",
              menu: {
                id: newMenu.dataValues.id
              }
            })
          })
      })
    }
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        "An error occured while duplicating menu",
    });
  });
};
const duplicateCategoriesAndDishes = (oldMenu, newMenu) => {
  return new Promise((resolve, reject) => {
    if(oldMenu.Categories.length === 0) {
      resolve();
    }
    oldMenu.Categories.forEach(c => {
      Category.create({
        name: c.dataValues.name,
        menuId: newMenu.dataValues.id,
        description: c.dataValues.description,
      }).then((cCopy) => {
        if(c.Dishes.length == 0) {
          resolve();
        }
        c.Dishes.forEach(d => {
          Dish.create({
            name: d.dataValues.name,
            description: d.dataValues.description,
            price: d.dataValues.price,
            categoryId: cCopy.dataValues.id,
            restaurantId: d.dataValues.restaurantId,
            addons: d.dataValues.addons,
            canRemove: d.dataValues.canRemove,
            notes: d.dataValues.notes,
            tableTalkPoints: d.dataValues.tableTalkPoints,
          }).then((dCopy) => {
            dCopy.setTags(d.Tags);
            resolve();
          })
        })
      }).catch((err) => {
        reject(err)
      })
    })
  })
}

module.exports.getAllMenus = (req, res) => {
  let userRestaurantId = req.user.restaurantId;
  Menu.findAll({
    where: { restaurantId: userRestaurantId },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message: err.message || "An error occured while getting menus list",
      });
    });
};

module.exports.getMenuAsCSV = (req, res) => {
  let menuId = req.params.id;
  Menu.findOne({
    where: { id: menuId },
    include: [
      {
        model: Category,
        include: [
          { model: Dish, as: "Dishes", include: [{ model: Tag, as: "Tags" }] },
        ],
      },
    ],
    order: [[Category, "updatedAt", "asc"]],
  }).then((menu) => {
    return menuToCSV(menu)
  }).then((csv) => {
    res.send({
      csv: csv
    })
  }).catch((err) => {
    console.error(err);
    res.status(500).send({
      message: "Could not get menu as CSV"
    })
  })
}

module.exports.fetchAsset = async (req, res) => {
  let path = req.params[0];

  getStaticFile(`assets/${path}`)
    .then((data) => {
      res.setHeader("Content-Type", data.ContentType);
      res.send(data.Body);
    })
    .catch((err) => {
      console.log(err);
      res.status(err.statusCode).send({
        message: err.message
      });
    });
};

function imageUploadHelper(path, req, res) {
  const headers = caseless(req.headers);
  uploadFile(path, req.body, headers.get('content-type'))
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `An error occurred while uploading asset to ${path}`
      });
    });
}

function imageDownloadHelper(path, req, res) {
  getFile(path)
    .then((data) => {
      res.setHeader("Content-Type", data.ContentType);
      res.send(data.Body);
    })
    .catch((err) => {
      console.log(err);
      res.status(err.statusCode).send({
        message: err.message
      });
    });
}

module.exports.uploadRestaurantImage = async (req, res) => {
  imageUploadHelper(`restaurants/${req.params.id}`, req, res);
}

module.exports.getRestaurantImage = async (req, res) => {
  imageDownloadHelper(`restaurants/${req.params.id}`, req, res);
}

module.exports.uploadMenuImage = async (req, res) => {
  imageUploadHelper(`menus/${req.params.id}`, req, res);
}

module.exports.getMenuImage = async (req, res) => {
  imageDownloadHelper(`menus/${req.params.id}`, req, res);
}

module.exports.uploadDishImage = async (req, res) => {
  imageUploadHelper(`dishes/${req.params.id}`, req, res);
}

module.exports.getDishImage = async (req, res) => {
  imageDownloadHelper(`dishes/${req.params.id}`, req, res);
}

module.exports.publicMenuList = (req, res) => {
  let uniqueName = req.params.uniqueName;

  Restaurant.findOne({
    where: {
      uniqueName: uniqueName
    },
    include: [
      { model: Menu, where: { published: true } }
    ]
  })
  .then(restaurant => res.send(restaurant))
  .catch(err => {
    console.log(err)
    res.send(err)
  })
};

module.exports.publicDishList = (req, res) => {
  let uniqueName = req.params.uniqueName;
  let menuId = req.params.menuId;
  Dish.findAll({
    include: [
      { model: Tag, as: "Tags" },
      { model: Category, where: { menuId: menuId } },
      { model: Restaurant, where: { uniqueName: uniqueName }, attributes: [] },
    ],
    order: [[Category, "createdAt", "asc"]],
  })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "An error occured while getting dishes list",
      })
    );
};

module.exports.publicRestaurantList = (req, res) => {
  res.send("[]");
};
