module.exports = app => {
  const controller = require('./controller');

  var router = require('express').Router();


  router.post('/dishes', controller.createDish);
  router.get('/dishes', controller.dishesList);
  router.get('/dishes/:id', controller.getDish);
  router.put('/dishes/:id', controller.updateDish);
  router.delete('/dishes/:id', controller.deleteDish);

  app.use('/api', router)
};