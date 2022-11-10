const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const { passport, ...controller } = require('./controller');
const categoryController = require('./src/controllers/categories');
const dietController = require('./src/controllers/diets');
const dishController = require('./src/controllers/dishes');
const imagesController = require('./src/controllers/images');
const menuController = require('./src/controllers/menus');
const modificationController = require('./src/controllers/modifications');
const redirectController = require('./src/controllers/redirect');
const restaurantController = require('./src/controllers/restaurants');
const tagController = require('./src/controllers/tags');
const userController = require('./src/controllers/users');

module.exports = (app) => {
  const revProxy = express.Router();
  revProxy.all(
    '/smart-menu/*',
    proxy('https://nomi-smart-menu.netlify.app', {
      proxyReqPathResolver: (req) => `/${req.params[0]}`,
    }),
  );
  app.use('/app', revProxy);

  // use cors only other than reverse proxy, otherwise web browsers won't be able to
  // access the react apps
  const whitelist = [
    /https\:\/\/[a-z]*\.?nomi\.menu/,
    /https\:\/\/(.*--)?(.+)\.netlify\.app/,
    /http\:\/\/localhost:8000/,
    /http\:\/\/localhost:8001/,
    /http\:\/\/localhost:3000/,
  ];
  const corsOptions = {
    origin(origin, callback) {
      const found = whitelist.find((regex) => regex.test(origin));
      if (found !== undefined || origin === undefined) {
        callback(null, true);
      }
      else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  const router = express.Router();

  router.post('/restaurants/register', restaurantController.createRestaurant);
  router.get('/assets/*', controller.fetchAsset);

  router.post('/user/register', userController.registerUser);
  router.get('/user/check-email', userController.checkEmail);
  router.post('/user/login', userController.loginUser);

  router.get('/images/restaurants/:id', imagesController.getRestaurantImage);
  router.get('/images/menus/:id', imagesController.getMenuImage);
  router.get('/images/dishes/:id', imagesController.getDishImage);

  // All routes below are authenticated
  router.use(passport.authenticate('jwt', { session: false }));
  router.put('/images/restaurants/:id', imagesController.uploadRestaurantImage);
  router.put('/images/menus/:id', imagesController.uploadMenuImage);
  router.put('/images/dishes/:id', imagesController.uploadDishImage);

  router.get('/restaurants/me', restaurantController.getRestaurant);
  router.put('/restaurants/:id', restaurantController.updateRestaurant);
  router.post('/restaurants/register', restaurantController.createRestaurant);

  router.post('/dishes', dishController.createDish);
  router.get('/dishes/:id', dishController.getDish);
  router.put('/dishes/:id', dishController.updateDish);
  router.delete('/dishes/:id', dishController.deleteDish);
  router.get('/dishes-by-category', dishController.getDishesByCategory);
  router.get('/dishes-by-name', dishController.getDishesByName);

  // TODO(tony): verify the usage or remove
  // router.post('/upload-menu-csv', controller.uploadMenuCSV);

  router.post('/categories', categoryController.createCategory);
  router.get('/categories/:id', categoryController.getCategory);
  router.get('/categories-by-menu/:menuId', categoryController.getAllCategoriesByMenu);
  router.put('/categories/:id', categoryController.updateCategory);
  router.delete('/categories/:id', categoryController.deleteCategory);

  router.get('/tags', tagController.getAllTags);

  router.get('/diets', dietController.getAllDiets);

  router.post('/menus', menuController.createMenu);
  router.post('/menus/bulkCreate', menuController.bulkCreateDish);
  router.put('/menus/update-menu-order', menuController.updateMenuOrder);
  router.get('/menus/:id/csv', menuController.getMenuAsCSV);
  router.put('/menus/:id/toggle-filtering', menuController.toggleFiltering);
  router.post('/menus/:id/uploadCSV', menuController.uploadMenuCSV);
  router.post('/menus/:id/favorite-menu', menuController.favoriteMenu);
  router.delete('/menus/:id', menuController.deleteMenu);
  router.get('/menus/:id', menuController.getMenu);
  router.post('/menus/:id', menuController.duplicateMenu);
  router.put('/menus/:id', menuController.updateMenu);
  router.put('/menus/:id/update-category-order', menuController.updateCategoryOrder);
  router.put('/menus/:id/update-dish-order', menuController.updateDishOrder);
  router.delete('/menus/:id/dishes/bulkDelete', menuController.bulkDeleteDish);
  router.get('/all-menus', menuController.getAllMenus);

  router.post('/modifications', modificationController.createModification);
  router.put('/modifications/:id', modificationController.updateModification);
  router.get('/modifications', modificationController.getModifications);

  router.get('/user/favorite-menus', userController.getFavoriteMenus);
  router.get('/user/details', userController.getUserDetails);
  router.put('/user/details', userController.updateUserDetails);
  router.post('/user/password', userController.updatePassword);

  // /groups/:groupId/restaurants/:restaurantId/menus/:menuId/

  app.use('/api', router);

  const webApiRouter = express.Router();
  webApiRouter.get('/:uniqueName', controller.publicMenuList);
  webApiRouter.get('/:uniqueName/:menuId', controller.publicDishList);
  webApiRouter.get('/restaurants', controller.publicRestaurantList);
  app.use('/webApi', webApiRouter);

  const redirectRouter = express.Router();
  redirectRouter.get('/', redirectController.redirect);
  app.use('/redirect', redirectRouter);
};
