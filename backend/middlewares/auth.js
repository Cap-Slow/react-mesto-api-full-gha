const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/unauthorizedError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
    return;
  }
  let payload;
  jwt.verify(token, JWT_SECRET || 'some-secret-key', (err, decoded) => {
    if (err) {
      next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
      return false;
    }
    payload = decoded;
    return payload;
  });
  const isUserExist = User.findById(payload._id).then((user) => Boolean(user));
  if (!isUserExist) {
    next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
    return;
  }
  req.user = { _id: payload._id };
  next();
};
