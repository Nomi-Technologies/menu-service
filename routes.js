const express = require('express');

module.exports = app => {
  const controller = require('./controller');
  const { passport } = require('./controller')


  var router = express.Router();
  var mobileRouter = express.Router();


  router.post('/user/register', controller.registerUser);
  router.post('/user/login', controller.loginUser);

  router.post('/dishes', passport.authenticate('jwt', {session: false}), controller.createDish);
  router.get('/dishes', passport.authenticate('jwt', {session: false}), controller.dishesList);
  router.get('/dishes/:id', passport.authenticate('jwt', {session: false}), controller.getDish);
  router.put('/dishes/:id', passport.authenticate('jwt', {session: false}), controller.updateDish);
  router.delete('/dishes/:id', passport.authenticate('jwt', {session: false}), controller.deleteDish);
  router.post('/restaurants/register', controller.createRestaurant);

  mobileRouter.get('/dishes', controller.getDishForMobile);

  app.use('/api', router);
  app.use('/mobileapi', mobileRouter);
};