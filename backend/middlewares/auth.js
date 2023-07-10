const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/unauthorizedError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const unauthorizedError = new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  if (!token) {
    next(unauthorizedError);
    return;
  }
  let payload;
  jwt.verify(token, JWT_SECRET || 'some-secret-key', (err, decoded) => {
    if (err) {
      next(unauthorizedError);
      return false;
    }
    payload = decoded;
    return payload;
  });
  const isUserExist = User.findById(payload._id).then((user) => Boolean(user));
  if (!isUserExist) {
    next(unauthorizedError);
    return;
  }
  req.user = { _id: payload._id };
  next();
};
