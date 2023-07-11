const routes = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');
const { NONEXISTENT_URL_MESSAGE } = require('../utils/constants');

routes.use('', userRoutes);
routes.use('/cards', auth, cardRoutes);
routes.use('*', (req, res, next) => {
  next(new NotFoundError(NONEXISTENT_URL_MESSAGE));
});

module.exports = routes;
