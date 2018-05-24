const init = (app,port) => {
    
    var serverHttp = require('http').Server(app);
    var socketio = require('socket.io')(serverHttp);
    var jwt = require('jsonwebtoken');

    //Cấu hình lắng socket
    var socketPort = (process.env.PUSH_PORT || port);
    serverHttp.listen(socketPort, () => console.log('Socket start in: port ' + socketPort));

    // Sự kiện connect khi có client kết nối đến.
    socketio.on('connection', mySocket => {
        console.log(`Thiết bị mới kết nối tới Server với Socket ID: ${mySocket.id} `);

        //Lắng nghe khi người dùng thoát
        mySocket.on('disconnect', () => {
            console.log(`Thiết bị [ ${mySocket.id} ] ngắt kết nối`)
            // $index = _findIndex(usenorOnline, ['id', socket.id]);
            // userOnline.splice($index, 1);
            // socketio.sockets.emit('updateUesrList', userOnline);
        })

        //Yêu cầu client gửi lên accessToken
        mySocket.emit('accessToken',mySocket.id);

        //Sự kiện client gửi lên accessToken để chứng thực.
        mySocket.on('accessToken', data =>{
            let accessToken = data.accessToken

            // verify a token symmetric
            jwt.verify(accessToken, '%@zrp$&nqe@e^x!bz^x#t*!xvjwg^dtx', (err, decoded) => {
                // Nếu lỗi
                if (err) {
                    return
                }

                // Sử lý dữ liệu decoded
                
            });

        })
    });
}

module.exports = {init};

//  //lắng nghe khi có người gửi tin nhắn
//  socket.on('newMessage_client', data => {
//     //gửi lại tin nhắn cho tất cả các user dang online
//     console.log(data)
//     // socketio.sockets.emit('newMessage_server',
//     // {
//     //     id: data.id,
//     //     data: data.data
//     // });
// })

// const addEvent = (func) => {

// }



