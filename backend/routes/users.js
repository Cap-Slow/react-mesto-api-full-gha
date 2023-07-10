const userRoutes = require('express').Router();
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
const {
  userSignUpValidator, userLoginValidator, userIdValidator, userUpdateValidator,
  userUpdateAvatarValidator,
} = require('../middlewares/requestValidators');

userRoutes.post(
  '/signup',
  userSignUpValidator,
  createUser,
);

userRoutes.post(
  '/signin',
  userLoginValidator,
  login,
);

userRoutes.get('/users', auth, getUsers);

userRoutes.get(
  '/users/me',
  auth,
  userIdValidator,
  getUserInfo,
);

userRoutes.get(
  '/users/:userId',
  auth,
  userIdValidator,
  getUserById,
);

userRoutes.patch(
  '/users/me',
  auth,
  userUpdateValidator,
  decoratedUpdateProfile,
);

userRoutes.patch(
  '/users/me/avatar',
  auth,
  userUpdateAvatarValidator,
  decoratedUpdateAvatar,
);

module.exports = userRoutes;
