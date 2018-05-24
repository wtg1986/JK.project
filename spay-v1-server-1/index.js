// Get dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const compression = require('compression');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const expressStatusMonitor = require('express-status-monitor');
const bodyParser = require('body-parser');
const mongoUtil = require('./config/mongo');
const dataCache = require('./controllers/dataCache')
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const config = require('./config/auth');
const auth = require('./controllers/auth')
const chat = require('./controllers/chat')

//Load environment variables
require('dotenv').config();

//Route handlers
const authApi = require('./controllers/auth.api');
const chatApi = require('./controllers/chat.api');

//Create server
const app = express();

//DB setup
mongoUtil.connectToServer(err => {
	if (err) return console.log(err);
});

//Express configuration
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 1140);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use( '/resources',
	express.static(path.join(__dirname, 'public'), {
		maxAge: 31557600000
	})
);

//Error handler
app.use(errorHandler());

//API routes
app.use('/api/auth', authApi);
app.use('/api/chat', chatApi);

//Upload file
app.use(fileUpload());
app.post('/upload', (req, res) => {
    if (!req.files)
      	return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname + '/public/images/avatas/avata_d.jpg', function(err) {
	  if (err)
	  {
		  	console.log(err)
        	return res.status(500).send(err);
	  }
      res.send('File uploaded!');
    });
});


let server = app.listen(app.get('port'), () => {
	console.log(
		'%s App is running at http://localhost:%d in %s mode',
		chalk.green('✓'),
		app.get('port'),
		app.get('env')
	);
	console.log('  Press CTRL-C to stop\n');
});


//Web sockets setup
let io = require('socket.io')(server);

io.on('connection', socket => {
	socket.isVerified = false

	//Yêu cầu client gửi lên accessToken
	socket.emit('onAccessToken',socket.id);

	//Sau 3s không xác minh được accessToken sẽ đóng kết nối.
	setTimeout(() => {
		!socket.isVerified && socket.disconnect();
	},3000)

	//Sự kiện ngắt kết nối
	socket.on('disconnect', () => {
		console.log(`${chalk.red(`<-`)} Tài khoản [${chalk.red(socket.accountId)}] ngắt kết nối`);
		//Cập nhật trạng thái ONLINE cho tài khoản.
		auth.updateAccountStatus(socket.accountId,'OFFLINE')
		socket.isVerified = false
		socket.accountId = null
	});

	socket.on('onAccessToken', (data) => {
		//Không gửi được accessToken
		if (!data.accessToken) return false

		//Kiểm tra accessToken
		jwt.verify(data.accessToken, config.secret, (err, acc) => {
			if (err) {
				return false
			} else {
				socket.isVerified = true
				socket.accountId = acc.accountId
				dataCache.addPushEndpoint({
					accountId : acc.accountId,
					socket: socket
				})
				//Cập nhật trạng thái ONLINE cho tài khoản.
				auth.updateAccountStatus(acc.accountId,'ONLINE')
				console.log(`${chalk.green(`->`)} Tài khoản [${chalk.green(acc.accountId)}] đã kết nối...`);
			}
		});		
	})

	socket.on('onChatMessage', (data) => {
		chat.insertChatMessage(data)
		let push = dataCache.getPushEndpoint(data.toAccountId)
		push && push.socket.emit('onChatMessage',{
			userName: data.fromAccountId, 
			mobileNumber: data.fromAccountId, 
			avataUrl: `/resources/images/avatas/avata_${data.fromAccountId}.jpg`, 
			message: data.message, 
			time : Date.now()
		})
	})
});

app.set('socketio', io);
app.use(expressStatusMonitor({ 
	websocket: io, 
	port: app.get('port'),
	title: 'SPAY API Server Monitor'
}));
