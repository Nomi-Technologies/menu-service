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
  const dietController = require("./src/controllers/diets");
  const groupController = require('./src/controllers/groups')


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

  var router = express.Router();
  router.get("/assets/*", controller.fetchAsset);

  router.post("/user/register", userController.registerUser);
  router.get("/user/check-email", userController.checkEmail);
  router.post("/user/login", userController.loginUser);

  router.get("/images/restaurants/:id", controller.getRestaurantImage);
  router.get("/images/menus/:id", controller.getMenuImage);
  router.get("/images/dishes/:id", controller.getDishImage);


  router.post('/groups', groupController.createGroup);

  // All routes below are authenticated
  router.use(passport.authenticate("jwt", { session: false }));

  // Groups
  router.get("/groups/:groupId", groupController.getGroup);
  router.get("/groups/:groupId/restaurants", restaurantController.restaurantList);
  router.post("/groups/:groupId/restaurants", restaurantController.createRestaurant);
  router.get("/groups/:groupId/restaurants/:restaurantId", restaurantController.getRestaurant);
  router.put("/groups/:groupId/restaurants/:groupId", restaurantController.updateRestaurant);

  // Menus
  router.get("/groups/:groupId/restaurants/:restaurantId/menus", menuController.getAllMenus);
  router.post("/groups/:groupId/restaurants/:restaurantId/menus", menuController.createMenu);
  router.get("/groups/:groupId/restaurants/:restaurantId/menus/:menuId", menuController.getMenu);
  router.put("/groups/:groupId/restaurants/:restaurantId/menus/:menuId", menuController.updateMenu);
  router.delete("/groups/:groupId/restaurants/:restaurantId/menus/:menuId", menuController.deleteMenu);
  router.get("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/csv", menuController.getMenuAsCSV);
  router.post("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/csv", menuController.uploadMenuCSV);
  router.post("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/duplicate", menuController.duplicateMenu);
  router.put("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/update-category-order", menuController.updateCategoryOrder);
  router.put("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/update-dish-order", menuController.updateDishOrder);
  router.get("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/search", dishController.getDishesByName);

  // Categories
  router.post("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories", categoryController.createCategory);
  router.get("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId", categoryController.getCategory);
  router.put("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId", categoryController.updateCategory);
  router.delete("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId", categoryController.deleteCategory);
  
  router.get("/categories-by-menu/:menuId", categoryController.getAllCategoriesByMenu); // TODO: What is this used for?

  // Dishes
  router.post("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes", dishController.createDish);
  router.get("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes/:dishId", dishController.getDish);
  router.put("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes/:dishId", dishController.updateDish);
  router.delete("/groups/:groupId/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/dishes/:dishId", dishController.deleteDish);

  // Tags and Diets
  router.get("/tags", tagController.getAllTags);
  router.get("/diets", dietController.getAllDiets);


  // Modifications
  router.get("/groups/:groupId/restaurants/:restaurantId/modifications", modificationController.getModifications);
  router.post("/groups/:groupId/restaurants/:restaurantId/modifications", modificationController.createModification);
  router.put("/groups/:groupId/restaurants/:restaurantId/modifications/:modificationId", modificationController.updateModification);
  
  // User
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
