const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

module.exports = (app) => {
  const controller = require("./controller");
  const { passport } = require("./controller");
  const categoryController = require("./src/controllers/categories");
  const dishController = require("./src/controllers/dishes");
  const menuController = require("./src/controllers/menus");
  const modificationController = require("./src/controllers/modifications");
  const restaurantController = require("./src/controllers/restaurants");
  const tagController = require("./src/controllers/tags");
  const userController = require("./src/controllers/users");


  var revProxy = express.Router();
  revProxy.all(
    "/smart-menu/*",
    proxy("https://nomi-smart-menu.netlify.app", {
      proxyReqPathResolver: (req) => `/${req.params[0]}`,
    })
  );
  app.use("/app", revProxy);

  // use cors only other than reverse proxy, otherwise web browsers won't be able to
  // access the react apps
  var whitelist = [
    /https\:\/\/[a-z]*\.?nomi\.menu/,
    /https\:\/\/(.*--)?(.+)\.netlify\.app/,
    /http\:\/\/localhost:8000/,
    /http\:\/\/localhost:8001/,
  ];
  var corsOptions = {
    origin: function (origin, callback) {
      const found = whitelist.find((regex) => regex.test(origin));
      if (found !== undefined || origin === undefined) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  // var winston = require('winston');
  // var expressWinston = require('express-winston');

  // app.use(expressWinston.logger({
  //   transports: [
  //     new winston.transports.Console()
  //   ],
  //   format: winston.format.combine(
  //     winston.format.colorize(),
  //     winston.format.json()
  //   ),
  //   meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  //   msg: "[HTTP] {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  //   expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  //   colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  //   ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  // }));

  var router = express.Router();

  router.post("/restaurants/register", restaurantController.createRestaurant);
  router.get("/assets/*", controller.fetchAsset);

  router.post("/user/register", userController.registerUser);
  router.get("/user/check-email", userController.checkEmail);
  router.post("/user/login", userController.loginUser);

  router.get("/images/restaurants/:id", controller.getRestaurantImage);
  router.get("/images/menus/:id", controller.getMenuImage);
  router.get("/images/dishes/:id", controller.getDishImage);

  // All routes below are authenticated
  router.use(passport.authenticate("jwt", { session: false }));
  router.put("/images/restaurants/:id", controller.uploadRestaurantImage);
  router.put("/images/menus/:id", controller.uploadMenuImage);
  router.put("/images/dishes/:id", controller.uploadDishImage);
  
  router.get("/restaurants/me", restaurantController.getRestaurant);
  router.put("/restaurants/:id", restaurantController.updateRestaurant);
  router.post("/restaurants/register", restaurantController.createRestaurant);
  
  router.post("/dishes", dishController.createDish);
  router.get("/dishes/:id", dishController.getDish);
  router.put("/dishes/:id", dishController.updateDish);
  router.delete("/dishes/:id", dishController.deleteDish);
  router.get("/dishes-by-category", dishController.getDishesByCategory);
  router.get("/dishes-by-name", dishController.getDishesByName);
  router.post("/upload-menu-csv", controller.uploadMenuCSV);  // TODO(tony): verify the usage or remove
  
  router.post("/categories", categoryController.createCategory);
  router.get("/categories/:id", categoryController.getCategory);
  router.get("/categories-by-menu/:menuId", categoryController.getAllCategoriesByMenu);
  router.put("/categories/:id", categoryController.updateCategory);
  router.delete("/categories/:id", categoryController.deleteCategory);
  router.get("/tags", tagController.getAllTags);

  router.post("/menus", menuController.createMenu);
  router.post("/menus/bulkCreate", menuController.bulkCreateDish);
  router.get("/menus/:id/csv", menuController.getMenuAsCSV);
  router.put("/menus/:id/toggle-filtering", menuController.toggleFiltering);
  router.post("/menus/:id/uploadCSV", menuController.uploadMenuCSV);
  router.post("/menus/:id/favorite-menu", menuController.favoriteMenu);
  router.delete("/menus/:id", menuController.deleteMenu);
  router.get("/menus/:id", menuController.getMenu);
  router.post("/menus/:id", menuController.duplicateMenu);
  router.put("/menus/:id", menuController.updateMenu);
  router.put("/menus/:id/update-category-order", menuController.updateCategoryOrder);
  router.put("/menus/:id/update-dish-order", menuController.updateDishOrder);
  router.delete("/menus/:id/dishes/bulkDelete", menuController.bulkDeleteDish);
  router.get("/all-menus", menuController.getAllMenus);

  router.post("/modifications", modificationController.createModification);
  router.put("/modifications/:id", modificationController.updateModification);
  
  router.get("/user/favorite-menus", userController.getFavoriteMenus);
  router.get("/user/details", userController.getUserDetails);
  router.put("/user/details", userController.updateUserDetails);
  router.post("/user/password", userController.updatePassword);

  app.use("/api", router);

  var webApiRouter = express.Router();
  webApiRouter.get("/:uniqueName", controller.publicMenuList);
  webApiRouter.get("/:uniqueName/:menuId", controller.publicDishList);
  webApiRouter.get("/restaurants", controller.publicRestaurantList);
  app.use("/webApi", webApiRouter);
};
