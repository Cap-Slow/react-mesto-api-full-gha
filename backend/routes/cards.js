const cardRoutes = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');
const { cardBodydValidator, cardIdValidator } = require('../middlewares/requestValidators');

cardRoutes.get('', getCards);
cardRoutes.post(
  '',
  cardBodydValidator,
  createCard,
);
cardRoutes.delete(
  '/:cardId',
  cardIdValidator,
  deleteCard,
);
cardRoutes.put(
  '/:cardId/likes',
  cardIdValidator,
  addCardLike,
);
cardRoutes.delete(
  '/:cardId/likes',
  cardIdValidator,
  removeCardLike,
);

module.exports = cardRoutes;
