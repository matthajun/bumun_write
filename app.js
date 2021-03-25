const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const api = require('./routes/api');
const stix_event = require('./service/stixInsert_event');
const stix_anomaly = require('./service/stixInsert_anomaly');

const winston = require('./config/winston')(module);

const app = express();
const { sequelize } = require('./models');
require('./association');
const makejson = require('./utils/makejson');

const dotenv = require('dotenv');
dotenv.config();

//app.set('view engine', 'pug');
app.set('port', process.env.PORT);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Other settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) { // 1
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

sequelize.sync({ force: false })
    .then(() => {
      winston.info('success db connect ');
    })
    .catch((err) => {
      winston.error(err.stack);
    });

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  winston.error(err.stack);
  res.json(makejson.makeResData(err,req))
});

app.set('etag', false);

app.listen(app.get('port'), () => {
  winston.info(app.get('port')+ '번 포트에서 대기중');
});

stix_event.searchAndInsert();
stix_anomaly.searchAndInsert();
