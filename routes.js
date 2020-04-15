module.exports = app => {
  const controller = require('./controller');
  const { passport } = require('./controller')


  var router = require('express').Router();


  router.post('/dishes', passport.authenticate('jwt', {session: false}), controller.createDish);
  router.get('/dishes', passport.authenticate('jwt', {session: false}), controller.dishesList);
  router.get('/dishes/:id', passport.authenticate('jwt', {session: false}), controller.getDish);
  router.put('/dishes/:id', passport.authenticate('jwt', {session: false}), controller.updateDish);
  router.delete('/dishes/:id', passport.authenticate('jwt', {session: false}), controller.deleteDish);


  router.post('/user/register', controller.registerUser);
  router.post('/user/login', controller.loginUser);

  app.use('/api', router)
};