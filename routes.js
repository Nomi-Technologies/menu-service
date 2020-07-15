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
  ];
  var corsOptions = {
    origin: function (origin, callback) {
      const found = whitelist.find(regex => regex.test(origin));
      if (found !== undefined) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  var router = express.Router();  

  router.post('/restaurants/register', controller.createRestaurant);
  router.get('/assets/*', controller.fetchAsset);

  router.post("/user/register", controller.registerUser);
  router.post("/user/login", controller.loginUser);
  router.get("/user/details", controller.getUserDetails);
  router.put("/user/details/:id", controller.updateUserDetails);

  router.get("/assets/*", controller.fetchAsset);

  router.use(passport.authenticate("jwt", { session: false }));
  router.get("/restaurants/me", controller.getRestaurant);
  router.put("/restaurants/me/:id", controller.updateRestaurant);
  router.post("/restaurants/register", controller.createRestaurant);
  router.post("/dishes", controller.createDish);
  router.get("/dishes", controller.dishesList);
  router.get("/dishes/:id", controller.getDish);
  router.put("/dishes/:id", controller.updateDish);
  router.delete("/dishes/:id", controller.deleteDish);
  router.get("/dishes-by-category", controller.dishesByCategory);
  router.post("/categories", controller.createCategory);
  router.get("/categories/:id", controller.getCategory);
  router.put("/categories/:id", controller.updateCategory);
  router.delete("/categories/:id", controller.deleteCategory);
  router.get("/tags", controller.getTags);

  app.use("/api", router);

  var webApiRouter = express.Router();
  webApiRouter.get("/dishes/:restaurantId", controller.publicDishList);
  webApiRouter.get("/restaurants", controller.publicRestaurantList);
  app.use("/webApi", webApiRouter);
};
