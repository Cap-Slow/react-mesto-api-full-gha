const OK_CODE = 200;
const CREATED_CODE = 201;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const DB_CONFLICT_CODE = 11000;
const SERVER_ERR_CODE = 500;
const SERVER_ERR_MESSAGE = 'На сервере произошла ошибка.';
const NOT_FOUND_USERID = 'Пользователь с указанным id не найден.';
const NOT_FOUND_CARDID = 'Карточка с указанным id не найдена.';
const UNAUTHORIZED_MESSAGE = 'Нет доступа.';
const WRONG_CREDENTIALS_MESSAGE = 'Неправильные почта или пароль.';
const FORBIDDEN_CARD_DELETE_MESSAGE = 'Нельзя удалять чужие карточки.';
const EXISTING_EMAIL_MESSAGE = 'Пользователь с таким email уже существует.';
const AUTH_SUCCESS_MESSAGE = 'Успешная авторизация.';
const urlRegex = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*\/?$/i;
module.exports = {
  OK_CODE,
  CREATED_CODE,
  NOT_FOUND_CODE,
  FORBIDDEN_CODE,
  CONFLICT_CODE,
  SERVER_ERR_CODE,
  DB_CONFLICT_CODE,
  UNAUTHORIZED_CODE,
  SERVER_ERR_MESSAGE,
  NOT_FOUND_USERID,
  NOT_FOUND_CARDID,
  UNAUTHORIZED_MESSAGE,
  WRONG_CREDENTIALS_MESSAGE,
  FORBIDDEN_CARD_DELETE_MESSAGE,
  EXISTING_EMAIL_MESSAGE,
  AUTH_SUCCESS_MESSAGE,
  urlRegex,
};
