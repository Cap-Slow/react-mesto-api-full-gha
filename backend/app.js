require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000, DATABASE_PATH } = process.env;
mongoose.connect(DATABASE_PATH || 'mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://moreparties.nomoreparties.sbs'],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
