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
const restaurantController = require('./src/controllers/restaurants');
const tagController = require('./src/controllers/tags');
const userController = require('./src/controllers/users');
const groupController = require('./src/controllers/groups')

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

  router.post('/users/login', userController.loginUser);
  router.post('/users/register', userController.registerUser);
  router.post('/groups/register', groupController.createGroup);

  router.get('/assets/*', controller.fetchAsset);
  router.get('/images/restaurants/:id', imagesController.getRestaurantImage);
  router.get('/images/menus/:id', imagesController.getMenuImage);
  router.get('/images/dishes/:id', imagesController.getDishImage);

  // All routes below are authenticated
  router.use(passport.authenticate('jwt', { session: false }));
  router.put('/images/restaurants/:id', imagesController.uploadRestaurantImage);
  router.put('/images/menus/:id', imagesController.uploadMenuImage);
  router.put('/images/dishes/:id', imagesController.uploadDishImage);

  // Groups
  router.get("/groups/me", groupController.getGroup);

  // Restaurants
  router.get("/restaurants", restaurantController.restaurantList);
  router.post("/restaurants", restaurantController.createRestaurant);
  router.get("/restaurants/:restaurantId", restaurantController.getRestaurant);
  router.put("/restaurants/:restaurantId", restaurantController.updateRestaurant);

  // Menus
  router.get("/restaurants/:restaurantId/menus", menuController.getAllMenus);
  router.post("/restaurants/:restaurantId/menus", menuController.createMenu);
  router.get("/restaurants/:restaurantId/menus/:menuId", menuController.getMenu);
  router.put("/restaurants/:restaurantId/menus/:menuId", menuController.updateMenu);
  router.delete("/restaurants/:restaurantId/menus/:menuId", menuController.deleteMenu);
  router.get("/restaurants/:restaurantId/menus/:menuId/csv", menuController.getMenuAsCSV);
  router.post("/restaurants/:restaurantId/menus/:menuId/csv", menuController.uploadMenuCSV);
  router.post("/restaurants/:restaurantId/menus/:menuId/duplicate", menuController.duplicateMenu);
  router.put("/restaurants/:restaurantId/menus/:menuId/update-category-order", menuController.updateCategoryOrder);
  router.put("/restaurants/:restaurantId/menus/:menuId/update-dish-order", menuController.updateDishOrder);
  router.get("/restaurants/:restaurantId/menus/:menuId/search", dishController.getDishesByName);

  // Categories
  router.post("/restaurants/:restaurantId/menus/:menuId/categories", categoryController.createCategory);
  router.get("/restaurants/:restaurantId/menus/:menuId/categories/:categoryId", categoryController.getCategory);
  router.put("/restaurants/:restaurantId/menus/:menuId/categories/:categoryId", categoryController.updateCategory);
  router.delete("/restaurants/:restaurantId/menus/:menuId/categories/:categoryId", categoryController.deleteCategory);
  
  router.get("/categories-by-menu/:menuId", categoryController.getAllCategoriesByMenu); // TODO: What is this used for?

  // Dishes
  router.post("/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes", dishController.createDish);
  router.get("/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes/:dishId", dishController.getDish);
  router.put("/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes/:dishId", dishController.updateDish);
  router.delete("/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes/:dishId", dishController.deleteDish);

  // Tags and Diets
  router.get("/tags", tagController.getAllTags);
  router.get("/diets", dietController.getAllDiets);

  // Modifications
  router.get("/restaurants/:restaurantId/modifications", modificationController.getModifications);
  router.post("/restaurants/:restaurantId/modifications", modificationController.createModification);
  router.put("/restaurants/:restaurantId/modifications/:modificationId", modificationController.updateModification);
  
  // User
  router.get("/user/favorite-menus", userController.getFavoriteMenus);
  router.get("/user/details", userController.getUserDetails);
  router.put("/user/details", userController.updateUserDetails);
  router.post("/user/password", userController.updatePassword);

  app.use("/api", router);

  const webApiRouter = express.Router();
  webApiRouter.get('/:uniqueName', controller.publicMenuList);
  webApiRouter.get('/:uniqueName/:menuId', controller.publicDishList);
  webApiRouter.get('/restaurants', controller.publicRestaurantList);
  app.use('/webApi', webApiRouter);
};
