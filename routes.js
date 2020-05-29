const express = require('express');
const cors = require('cors');

module.exports = app => {
  const controller = require('./controller');
  const { passport } = require('./controller')


  var router = express.Router();
  
  router.post('/user/register', controller.registerUser);
  router.post('/user/login', controller.loginUser);
  router.post('/restaurants/register', controller.createRestaurant);
  router.get('/assets/*', controller.fetchAsset);

  router.use(passport.authenticate('jwt', {session: false}));

  router.post('/dishes', controller.createDish);
  router.get('/dishes', controller.dishesList);
  router.get('/dishes/:id', controller.getDish);
  router.put('/dishes/:id', controller.updateDish);
  router.delete('/dishes/:id', controller.deleteDish);

  app.use('/api', router);

  var webApiRouter = express.Router();
  webApiRouter.get('/dishes/:restaurantId', controller.publicDishList);
  webApiRouter.get('/restaurants', controller.publicRestaurantList);
  app.use('/webApi', webApiRouter);
};