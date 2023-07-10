const routes = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');

routes.use('', userRoutes);
routes.use('/cards', auth, cardRoutes);
routes.use('*', (req, res, next) => {
  next(new Error());
});

module.exports = routes;
