const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

module.exports = (app) => {
  const controller = require("./controller");
  const { passport } = require("./controller");

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
    /https\:\/\/(.*--)?nomi-menu-dashboard\.netlify\.app/,
    /https\:\/\/(.*--)?nomi-smart-menu\.netlify\.app/,
    /http\:\/\/localhost:8000/,
    /http\:\/\/localhost:8001/
  ];
  var corsOptions = {
    origin: function (origin, callback) {
      const found = whitelist.find(regex => regex.test(origin));
      if (found !== undefined || origin === undefined) {
        callback(null, true)
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

  router.post('/restaurants/register', controller.createRestaurant);
  router.get('/assets/*', controller.fetchAsset);

  router.post("/user/register", controller.registerUser);
  router.get("/user/check-email", controller.checkEmail);
  router.post("/user/login", controller.loginUser);
  
  router.get("/assets/*", controller.fetchAsset);

  // All routes below are authenticated
  router.use(passport.authenticate("jwt", { session: false }));
  router.get("/restaurants/me", controller.getRestaurant);
  router.put("/restaurants/me", controller.updateRestaurant);
  router.post("/restaurants/register", controller.createRestaurant);
  router.post("/dishes", controller.createDish);
  router.get("/dishes/:id", controller.getDish);
  router.put("/dishes/:id", controller.updateDish);
  router.delete("/dishes/:id", controller.deleteDish);
  router.get("/dishes-by-category", controller.dishesByCategory);
  router.post("/upload-menu-csv", controller.uploadMenuCSV);
  router.get("/dishes-by-name", controller.dishesByName);
  router.post("/categories", controller.createCategory);
  router.get("/categories/:id", controller.getCategory);
  router.put("/categories/:id", controller.updateCategory);
  router.delete("/categories/:id", controller.deleteCategory);
  router.get("/tags", controller.getTags);
  router.post("/menus", controller.createMenu);
  router.get("/menus/:id", controller.getMenu);
  router.put("/menus/:id", controller.updateMenu);
  router.delete("/menus/:id", controller.deleteMenu);
  router.get("/all-menus", controller.getAllMenus);
  router.get("/user/details", controller.getUserDetails);
  router.put("/user/details", controller.updateUserDetails);

  app.use("/api", router);

  var webApiRouter = express.Router();
  webApiRouter.get("/:uniqueName", controller.publicMenuList);
  webApiRouter.get("/:uniqueName/:menuId", controller.publicDishList);
  webApiRouter.get("/restaurants", controller.publicRestaurantList);
  app.use("/webApi", webApiRouter);
};
