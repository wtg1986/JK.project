const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./auth');
const otp = require('./otp')
const config = require('../config/auth.js');
const errors = require('./error');
const otpGenerator = require('otp-generator');
const dataCache = require('./dataCache');

// Database Models
const Accounts = require('../models/Accounts');
const EmployeeVTCMobile = require('../models/EmployeeVTCMobile')
const RegisterOrders = require('../models/RegisterOrders')
const OTPs = require('../models/OTPs')
const RefCodePrices = require('../models/RefCodePrices')

// api/auth/checkMobileNumber 
// req: mobileNumber
// res: true/false
//------------------------------------------------------------------------------
router.get('/checkMobileNumber',
	(req,res,next) => {
		if (!req.query.mobileNumber) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi số điện thoại.',
				errors.errorEnum.WRONG_REQUEST
			)
		}
		// console.log(req.query.mobileNumber)
		// Kiểm tra số điện thoại này đã tồn tại chưa ?
		Accounts.findOne({ mobileNumber: req.query.mobileNumber})
				.then (acc => {
					if (!acc) 
						req.hasMobileNumber = false
					else	
						req.hasMobileNumber = true
					next()
				})
				.catch (err => {
					console.error(err)
					return errors.errorHandler(res, 
						'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
						errors.errorEnum.SYSTEM_ERROR)
				})
	},
	(req, res) => {
		res.status(201).send(req.hasMobileNumber);
	}
)

// api/auth/register 
// req: mobileNumber, passWord
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
router.post('/register',

	(req, res, next) => {

		if (!req.body.mobileNumber || !req.body.password) {
			return errors.errorHandler(
				res,
				'Bạn cần phải gửi số điện thoại và mật khẩu.',
				errors.errorEnum.WRONG_REQUEST
			);
		}

		Accounts.find({ mobileNumber: req.body.mobileNumber })
			//Kiểm tra tồn tại tài khoản và tạo mã OTP
			.then(acc => {
				if (acc.length > 0) {
					return { continue : false,
						obj: errors.errorHandler(
							res,
							'Tài khoản này đã tồn tại.',
							errors.errorEnum.ACCOUNT_EXISTS
						)
					}
				}
				
				//Kiểm tra tài khoản này có đang đợi xác thực OTP.
				RegisterOrders.findOne({mobileNumber: req.body.mobileNumber})
					.then(rg =>{
						if (rg) {
							return { continue : false,
								obj: errors.errorHandler(
									res,
									'Số điện thoại này đã đợi xác thực mã OTP.',
									errors.errorEnum.ACCOUNT_WAIT_OTP
								)
							}
						}
					})
					.catch(err => {
						console.error(err)
						return errors.errorHandler(res,
							'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
							errors.errorEnum.SYSTEM_ERROR)
					}); 

				
				// Tạo mã OTP
				let otpCode = otpGenerator.generate(6, { digits: true,alphabets: false,upperCase: false, specialChars: false });
				let otpType = 'REGISTER';

				//Tạo mã OTP mới
				const newOTP = new OTPs({
					otpType : otpType,
					otpCode : otpCode,
					expTime : Date.now() + 180000
				})

				let obj = OTPs.create(newOTP)
				
				return obj
			})

			//Tạo yêu cầu hàng đợi yêu cầu đăng ký
			.then(inp => {
				req.otp = inp;

				// Băm mật khẩu.
				let passwordHash = bcrypt.hashSync(req.body.password.trim(), 12);
				
				//Tạo Account mới
				const newRegisterOrder = new RegisterOrders({
					mobileNumber : req.body.mobileNumber,
					hashPassword : passwordHash,
					otpId : req.otp.otpId
				})
				RegisterOrders.create(newRegisterOrder)

				next();
			})

			// Nếu có lỗi, tạo mess lỗi
			.catch(err => {
				console.error(err)
				return errors.errorHandler(res, 
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
					errors.errorEnum.SYSTEM_ERROR)
			});
	},

	(req, res, next) =>{
		
		//Gửi SMS tới tới số điện thoại.
		otp.sentSMS({
				mobileNumber: req.body.mobileNumber,
				message: `Mã OTP đăng ký tài khoản Spay của bạn là: ${req.otp.otpCode} (có hiệu lực 3 phút)`
			},
			res => { },
			err => { }
		)
		next()
	},

	// Thành công/ Response về thành công.
	(req, res) => {
		res.status(201).send({
			success: true,
			otpId: req.otp.otpId,
			otpType: req.otp.otpType,
		});
	}
);

// api/auth/login 
// req: mobileNumber, passWord
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
router.post('/login',

	(req, res, next) => {
		
		if (!req.body.mobileNumber || !req.body.password) {
			return errors.errorHandler(
				res,
				'Bạn cần phải gửi số điện thoại và mật khẩu.',
				errors.errorEnum.WRONG_REQUEST
			);
		}

		Accounts.findOne({ mobileNumber: req.body.mobileNumber})
			.then(acc => {

				if (!acc) return errors.errorHandler(res, 'Không tồn tại tài khoản.',errors.errorEnum.ACCOUNT_NOT_EXISTS);
				
				bcrypt.compare(req.body.password, acc.password, (err, success) => {
					if (err) {
						console.error(err)
						return errors.errorHandler(
							res,
							'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
							errors.errorEnum.SYSTEM_ERROR
						);
					}

					if (!success)
						return errors.errorHandler(res, 'Nhập sai mật khẩu.',errors.errorEnum.WRONG_PASSWORD)
					else {
						req.account = acc;
						req.activity = 'login';
						next();
					}
				});
			})
			.catch(err => {
				console.error(err)
				return errors.errorHandler(res,
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
					errors.errorEnum.SYSTEM_ERROR
				);
			});
	},
	auth.createToken,
	auth.createRefreshToken,

	(req, res) => {
		res.status(201).send({
			success: true,
			accessToken: req.accessToken,
			refreshToken: req.refreshToken
		});
	}
);

// api/auth/OTPConfirm 
// req: otpId, otpCode, mobileNumber
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
router.post('/OTPConfirm',

	(req, res, next) => {

		if (!req.body.otpId || !req.body.otpCode || !req.body.mobileNumber) {
			return errors.errorHandler(
				res,
				'Bạn cần phải gửi mã OTP và số điện thoại',
				errors.errorEnum.WRONG_REQUEST
			);
		}

		OTPs.findOne({ otpId: req.body.otpId })

			// Kiểm tra tồn tại của mã OTP
			.then(otp => {
				if (!otp) 
					return { continue : false,
						obj: errors.errorHandler(
							res,
							'Mã OTP này không tồn tại hoặc hết hiệu lực',
							errors.errorEnum.WRONG_OTP
						)
					}

				// Kiểm tra OTP còn hiệu lực ko ?
				if (Date.now() > otp.expTime)
					return { continue : false,
						obj: errors.errorHandler(
							res,
							'Mã OTP này không tồn tại hoặc hết hiệu lực',
							errors.errorEnum.WRONG_OTP
						)
					}

				// Kiểm tra OTPCode có đúng ko?
				if (req.body.otpCode !== otp.otpCode)
					return { continue : false,
						obj: errors.errorHandler(
							res,
							'Mã OTP này không tồn tại hoặc hết hiệu lực',
							errors.errorEnum.WRONG_OTP
						)
					}

				return {continue : true}
			})

			// Lấy thông tin trong hàng đợi đăng ký
			.then(inp => {
				if (!inp.continue) return

				RegisterOrders.findOneAndRemove({mobileNumber: req.body.mobileNumber})
					.then(rq => {
						if (!rq) 
							return { continue : false,
								obj: errors.errorHandler(
									res,
									'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
									errors.errorEnum.SYSTEM_ERROR
								)
							}
						req.mobileNumber = rq.mobileNumber
						req.hashPassword = rq.hashPassword
						next();
					})
					.catch(err => {
						return errors.errorHandler(res, 
								res,
								'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
								errors.errorEnum.SYSTEM_ERROR
							)
					})
			})

			// Nếu có lỗi, tạo mess lỗi
			.catch(err => {
				return errors.errorHandler(res, 
					res,
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
					errors.errorEnum.SYSTEM_ERROR
				)
			});
	},

	auth.registerAccount,

	// Hàm tạo mã Token
	auth.createToken,

	// Hàm tạo mã refreshToken
	auth.createRefreshToken,

	// Thành công/ Response về thành công.
	(req, res) => {
		res.status(201).send({
			success: true,
			accessToken: req.accessToken,
			refreshToken: req.refreshToken
		});
	}
);

// api/auth/refreshToken 
// req: mobileNumber, passWord
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
// router.post('/refreshToken',
// 	auth.validateRefreshToken,
// 	auth.createToken,
// 	(req, res) => {
// 		res.status(201).send({
// 			success: true,
// 			accessToken: req.accessToken
// 		});
// 	}
// );


// Cấu hình AccessToken cho luồng gọi API cần xác thực
//------------------------------------------------------------------------------
router.use((req, res, next) => {
	
	var token = req.headers['authorization'];
	
	if (!token || token === undefined) {
		return errors.errorHandler(
			res,
			'Mọi request phải cần có accessToken.',
			errors.errorEnum.INVALID_TOKEN
		);
	}
	
	token = token.replace('Bearer ', '');

	jwt.verify(token, config.secret, (err, acc) => {
		if (err) {
			return errors.errorHandler(
				res,
				'AccessToken không hợp lệ.',
				errors.errorEnum.INVALID_TOKEN
			);
		} else {
			req.account = acc;
			next();
		}
	});
});


// api/auth/getProfile 
// req: mobileNumber, passWord
// res: accessToken, refreshToken
//------------------------------------------------------------------------------
router.get('/getProfile', (req, res, next) => {
	
	Accounts.findOne({accountId: req.account.accountId})
		.then(acc => {

			if (!acc) return errors.errorHandler(res, 'Không tồn tại tài khoản.',errors.errorEnum.ACCOUNT_NOT_EXISTS);

			// dataCache.addAccount({
			// 	accountId
			// })

			res.status(201).send({
				success: true,
				data: _.omit(acc.toObject(),
										'_id',
										'__v',
										'password',
										'refreshToken',
										'pincode'
									)})

		})
		.catch(err => {
			console.error(err)
			return errors.errorHandler(
				res,
				'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
				errors.errorEnum.SYSTEM_ERROR
			);
		});
});


// api/auth/getAll 
//------------------------------------------------------------------------------
router.get('/getAll', (req, res) => {

	let push = dataCache.getPushEndpoint('0968434969')
	push.socket.emit('onChatMessage',{
		userName: 'Kenny Tran', 
		mobileNumber: '0973651368', 
		avataUrl: '/resources/images/avatas/avata_0973651368.jpg', 
		message: 'Trần Duy Khánh...', 
		time: Date.now()
	})

	Accounts.find()
		.then(accs => {
			// console.log(acc)
			res.status(201).send({
				success: true,
				message: _.map(accs, a => {return _.omit(a.toObject(),'_id','__v','password')})
			});
		})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});

// api/auth/activeRefCode 
//------------------------------------------------------------------------------
router.post('/activeRefCode', 
	(req, res, next) => {
		let {refCode} = req.body
		
		//Tìm kiếm User có Refcode tương ứng.
		// console.log(refCode)
		Accounts.findOneAndUpdate({refCode: refCode},
			{'$inc': {balance: process.env.REFCODE_GIFT}},
			{new: true}
		)
			.then(acc1 => {

				//Không tìm thấy người dùng có mã refCode này.
				if (!acc1) 
					return { 
						continue : false,
						obj: errors.errorHandler(res, 'Refcode không tồn tại.', errors.errorEnum.REFCODE_NOT_EXISTS)}
				

				//Kiểm tra 2 người này đã nhận thưởng chưa ?
				RefCodePrices.find({ $or: [ { accountId1: acc1.accountId, accountId2: req.account.accountId }, 
											{ accountId1: req.account.accountId, accountId2: acc1.accountId } ] })
				.then(pr => {
					//2 Người này đã nhận thưởng với mã Code này.
					if (pr.length>10) return errors.errorHandler(
						res,
						'Mã code này bạn đã nhận thưởng',
						errors.errorEnum.REFCODE_IS_USED
					);

					Accounts.findOneAndUpdate({'accountId': req.account.accountId},
												{'$inc': {'balance': process.env.REFCODE_GIFT}},
												{new: true})
							.then(acc2 => {

								//Ghi nhận cộng thưởng cho 2 người này
								const newRefCodePrice = new RefCodePrices({
									accountId1 : acc1.accountId,
									accountId2 : acc2.accountId,
									price : process.env.REFCODE_GIFT
								})
								RefCodePrices.create(newRefCodePrice)

								//Tạo dữ liệu Push xuống người dùng 1.
								req.pushData = {accountId: acc1.accountId, balance: acc1.balance}
								req.newBalance = acc2.balance
								next()
							})
							.catch(err => {
								console.error(err)
								return errors.errorHandler(
									res,
									'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
									errors.errorEnum.SYSTEM_ERROR
								);
							});
							
				})
				.catch(err => {
					console.error(err)
					return errors.errorHandler(
						res,
						'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
						errors.errorEnum.SYSTEM_ERROR
					);
				})
			})
			.catch(err => {
				console.error(err)
				return errors.errorHandler(
					res,
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
					errors.errorEnum.SYSTEM_ERROR
				);
			});
	},
	(req, res, next) => {
		let pushEndpoint = dataCache.getPushEndpoint(req.pushData.accountId)
		if (pushEndpoint)
			pushEndpoint.socket.emit('onRefCodeActive',{
				accountId: pushEndpoint.accountId,
				balance: req.pushData.balance
			})
		next()
	},
	(req, res) => {
		res.status(201).send({
			success: true,
			balance: req.newBalance
		});
	}
);

// api/chat/getAgencys 
// req: begin, count, order
// res: list 
// cmt: lấy danh sách các Acency 
//------------------------------------------------------------------------------
router.get('/getAgencys',
	(req,res,next) => {
		if (!req.query.begin || !req.query.count || !req.query.order ) {
			return errors.errorHandler (
				res,
				'Bạn cần phải gửi tham số để lấy dữ liệu.',
				errors.errorEnum.WRONG_REQUEST
			)
		}
		
		// console.log(req.query.mobileNumber)
		// ChatMessage.find({ $or: [ { accountId_one: req.query.accountId, accountId_two: req.account.accountId }, 
        //                         { accountId_one: req.account.accountId, accountId_two: req.query.accountId } ] })
        //         .then(mess => {
        //             // console.log(mess[0])
        //             req.chatMessage =  mess.map((v,k) => {
        //                 return _.omit(v.toObject(),'_id','__v')
        //             })[0]
		// 			next()
		// 		})
		// 		.catch (err => {
		// 			console.error(err)
		// 			return errors.errorHandler(res, 
		// 				'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
		// 				errors.errorEnum.SYSTEM_ERROR)
		// 		})
	},
	(req, res) => {
		res.status(201).send(req.chatMessage === undefined ? [] : req.chatMessage);
	}
)

module.exports = router;

