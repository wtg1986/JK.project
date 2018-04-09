// const Expo = require('expo-server-sdk');

// // Create a new Expo SDK client
// let expo = new Expo();

// // Create the messages that you want to send to clents
// let somePushTokens = ['ExponentPushToken[cjV4xeKe36uX4XcDl5z6Ly]',]
// let messages = [];
// for (let pushToken of somePushTokens) {
//   // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

//   // Check that all your push tokens appear to be valid Expo push tokens
//   if (!Expo.isExpoPushToken(pushToken)) {
//     console.error(`Push token ${pushToken} is not a valid Expo push token`);
//     continue;
//   }

//   // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
//   messages.push({
//     to: pushToken,
//     sound: 'default',
//     title: 'KAKAKA',
//     body: 'Trần Duy Khánh',
//     data: { withSome: 'data' },
//   })
// }

// // The Expo push notification service accepts batches of notifications so
// // that you don't need to send 1000 requests to send 1000 notifications. We
// // recommend you batch your notifications to reduce the number of requests
// // and to compress them (notifications with similar content will get
// // compressed).
// let chunks = expo.chunkPushNotifications(messages);

// (async () => {
//   // Send the chunks to the Expo push notification service. There are
//   // different strategies you could use. A simple one is to send one chunk at a
//   // time, which nicely spreads the load out over time:
//   for (let chunk of chunks) {
//     try {
//       let receipts = await expo.sendPushNotificationsAsync(chunk);
//       console.log(receipts);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// })();


var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// //static resource
// app.use(express.static('public'));

var routes = require('./routes');
app.get('/', (req, res) => res.send('Hello World!'))
routes.configure(app)

var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9999);

var server = app.listen(port, () => 
    console.log('Server API running in :' + server.address().port));




// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// app.get('/', (req, res) => {
//     res.send("Home page. Server running okay.");
// })




// var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);

// var _findIndex = require('lodash/findIndex') // npm install lodash --save


// server.listen(port, () => console.log('Server running in port ' + port));


// var userOnline = []; //danh sách user dang online

// io.on('connection', function(socket) {
//     console.log(socket.id + ': connected');
    
//     socket.emit('id',socket.id);
    
//     //lắng nghe khi người dùng thoát
//     socket.on('disconnect', function() {
//         console.log(socket.id + ': disconnected')
//         $index = _findIndex(userOnline, ['id', socket.id]);
//         userOnline.splice($index, 1);
//         io.sockets.emit('updateUesrList', userOnline);
//     })

//     //lắng nghe khi có người gửi tin nhắn
//     socket.on('newMessage_client', data => {
//         //gửi lại tin nhắn cho tất cả các user dang online
//         console.log(data)
//         io.sockets.emit('newMessage_server',
//         {
//             id: data.id,
//             data: data.data
//         });
//     })

//     //lắng nghe khi có người login
//     socket.on('login', data => {
//         // kiểm tra xem tên đã tồn tại hay chưa
//         if (userOnline.indexOf(data) >= 0) {
//             socket.emit('loginFail'); //nếu tồn tại rồi thì gửi socket fail
//         } else {
//             // nếu chưa tồn tại thì gửi socket login thành công
//             socket.emit('loginSuccess', data);
//             userOnline.push({
//                 id: socket.id,
//                 name: data
//             })
//             io.sockets.emit('updateUesrList', userOnline);// gửi danh sách user dang online
//         }
//     })

// });
