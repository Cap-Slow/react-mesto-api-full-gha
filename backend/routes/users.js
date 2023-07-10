const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  createUser,
  decoratedUpdateAvatar,
  decoratedUpdateProfile,
  login,
  getUserInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { urlRegex } = require('../utils/constants');

userRoutes.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().pattern(urlRegex),
      })
      .unknown(true),
  }),
  createUser,
);

userRoutes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

userRoutes.get('/users', auth, getUsers);

userRoutes.get(
  '/users/me',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
      required: true,
    }),
  }),
  getUserInfo,
);

userRoutes.get(
  '/users/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
      required: true,
    }),
  }),
  getUserById,
);

userRoutes.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  decoratedUpdateProfile,
);

userRoutes.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(urlRegex),
    }),
  }),
  decoratedUpdateAvatar,
);

module.exports = userRoutes;
