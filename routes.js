const express = require('express');

module.exports = app => {
  const controller = require('./controller');

  var router = express.Router();
  var mobileRouter = express.Router();

  router.post('/dishes', controller.createDish);
  router.get('/dishes', controller.dishesList);
  router.get('/dishes/:id', controller.getDish);
  router.put('/dishes/:id', controller.updateDish);
  router.delete('/dishes/:id', controller.deleteDish);

  mobileRouter.get('/dishes', controller.getDishForMobile);

  app.use('/api', router);
  app.use('/mobileapi', mobileRouter);
};