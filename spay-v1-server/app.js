var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var serverConfig = require ('./utils/config')
var db = require('./utils/db');
var socket = require('./utils/socket')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/accounts');
var pushsRouter = require('./routes/pushs');

var app = express();

//Khởi tạo kết nối tới DB.
db.init(serverConfig.dataBaseUri)

//Khở tạo socket
socket.init(app,serverConfig.socketPort)

//Cài đặt view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Cấu hình
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Thiết lập các router
app.use('/', indexRouter);
app.use('/accounts', usersRouter);
app.use('/pushs', pushsRouter);

//Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
