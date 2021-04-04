const {
  sequelize,
  Dish,
  Tag,
  User,
  Restaurant,
  Category,
  Menu,
  FavoriteMenu,
  Modification,
  Diet,
} = require('./src/models');

const { createCategory } = require('./src/logic/categories');
const { createDish } = require('./src/logic/dishes');
const { parseCSV, menuToCSV, getOrCreateCategory } = require("./src/utils/csv-parser");
const { getStaticFile, getFile, uploadFile, uploadImage } = require('./src/utils/aws-s3-utils');
const slug = require("slug");
const { JWT_SECRET } = require("./config.js");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const caseless = require("caseless");
const { serializeError } = require('serialize-error');

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
  uploadImage(path, req, res, headers.get('content-type'))
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(JSON.stringify(serializeError(err)));
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
      { model: Diet, as: "Diets" },
      { model: Category, where: { menuId: menuId } },
      { model: Restaurant, where: { uniqueName: uniqueName }, attributes: [] },
      { model: Modification, as: "Modifications" }
    ],
    order: [[Category, "index", "asc"]],
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
