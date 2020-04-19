const express = require('express');

module.exports = app => {
  const controller = require('./controller');
  const { passport } = require('./controller')


  var router = express.Router();
  var mobileRouter = express.Router();

  router.use(passport.authenticate('jwt', {session: false}));
  router.post('/dishes', controller.createDish);
  router.get('/dishes', controller.dishesList);
  router.get('/dishes/:id', controller.getDish);
  router.put('/dishes/:id', controller.updateDish);
  router.delete('/dishes/:id', controller.deleteDish);


  router.post('/user/register', controller.registerUser);
  router.post('/user/login', controller.loginUser);

  mobileRouter.get('/dishes', controller.getDishForMobile);

  app.use('/api', router);
  app.use('/mobileapi', mobileRouter);
};