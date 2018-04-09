var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/accounts');

var app = express();

//Socket
var serverHttp = require('http').Server(app);
var socketio = require('socket.io')(serverHttp);

//Database
var mongoose = require('mongoose');
let options = {
  db:{native_parser: true},
  server:{poolSize: 5},
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/spay-v1-db',options).then(
  () => {
    console.log('3. Connect DB Successfully in: port 27017')
  },
  err => {
    console.log(`Connect failed. Error: ${err}`)
  }
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/accounts', usersRouter);

// catch 404 and forward to error handler
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

//Cấu hình static resscource
app.use(express.static('public'))

//Cấu hình lắng socket
var socketPort = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
serverHttp.listen(socketPort, () => console.log('1. Socket start in: port ' + socketPort));

socketio.on('connection', (socket) => {
    console.log('Có 1 client đã kết nối với ID: '+ socket.id + ': connected');
   
    // socket.emit('id',socket.id);
    
    //lắng nghe khi người dùng thoát
    socket.on('disconnect', function() {
        console.log(socket.id + ': disconnected')
        $index = _findIndex(userOnline, ['id', socket.id]);
        userOnline.splice($index, 1);
        socketio.sockets.emit('updateUesrList', userOnline);
    })

    //lắng nghe khi có người gửi tin nhắn
    socket.on('newMessage_client', data => {
        //gửi lại tin nhắn cho tất cả các user dang online
        console.log(data)
        socketio.sockets.emit('newMessage_server',
        {
            id: data.id,
            data: data.data
        });
    })

    //lắng nghe khi có người login
    socket.on('login', data => {
        // kiểm tra xem tên đã tồn tại hay chưa
        if (userOnline.indexOf(data) >= 0) {
            socket.emit('loginFail'); //nếu tồn tại rồi thì gửi socket fail
        } else {
            // nếu chưa tồn tại thì gửi socket login thành công
            socket.emit('loginSuccess', data);
            userOnline.push({
                id: socket.id,
                name: data
            })
            socketio.sockets.emit('updateUesrList', userOnline);// gửi danh sách user dang online
        }
    }) 
});


module.exports = app;
