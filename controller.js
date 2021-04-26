const passport = require('passport');
const passportJWT = require('passport-jwt');
const {
  Dish,
  Tag,
  User,
  Restaurant,
  Category,
  Menu,
  Modification,
  Diet,
} = require('./src/models');
const { getStaticFile } = require('./src/utils/aws-s3-utils');
const { JWT_SECRET } = require('./config.js');
const logger = require('./src/utils/logger');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

// auth strategy
const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  User.getUser({ email: jwtPayload.email }).then((user) => {
    if (user) {
      next(null, user);
    }
    else {
      next(null, false);
    }
  });
});

passport.use(strategy);
module.exports.passport = passport;

module.exports.fetchAsset = async (req, res) => {
  const path = req.params[0];

  getStaticFile(`assets/${path}`)
    .then((data) => {
      res.setHeader('Content-Type', data.ContentType);
      res.send(data.Body);
    })
    .catch((err) => {
      logger.error(err);
      res.status(err.statusCode).send({
        message: err.message,
      });
    });
};

module.exports.publicMenuList = (req, res) => {
  const { uniqueName } = req.params;

  Restaurant.findOne({
    where: {
      uniqueName,
    },
    include: [
      { model: Menu, where: { published: true } },
    ],
  })
  .then((restaurant) => res.send(restaurant))
  .catch((err) => {
    logger.error(err);
    res.send(err);
  });
};

module.exports.publicDishList = (req, res) => {
  const { uniqueName } = req.params;
  const { menuId } = req.params;
  Dish.findAll({
    include: [
      { model: Tag, as: 'Tags' },
      { model: Diet, as: 'Diets' },
      { model: Category, where: { menuId } },
      { model: Restaurant, where: { uniqueName }, attributes: [] },
      { model: Modification, as: 'Modifications' },
    ],
    order: [[Category, 'index', 'asc']],
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'An error occured while getting dishes list',
      });
    });
};

module.exports.publicRestaurantList = (req, res) => {
  res.send('[]');
};
