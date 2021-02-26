var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var defendeeRouter = require('./routes/defendee');
var contractJsonRouter = require('./routes/contractJson');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inspectRouter = require('./routes/inspect');
var saleRouter = require('./routes/sale');
var infoRouter = require('./routes/info');
var app = express();
let defendeeWatcher = require('./watch/defendeeWatcher');
let inspectWatcher = require('./watch/inspectWatcher');
let reportWatcher = require('./watch/reportWatcher');
let connector = require('./watch/connector');
let judge = require('./routes/judge');
const cors = require('cors');

defendeeWatcher(connector);
inspectWatcher(connector);
reportWatcher(connector);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sale', saleRouter);
app.use('/defendee', defendeeRouter);
app.use('/contractjson', contractJsonRouter);
app.use('/inspect', inspectRouter);
app.use('/judge', judge);
app.use('/info', infoRouter);

// catch 404 and forward to error handler
app.use(express.static('public'));
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
