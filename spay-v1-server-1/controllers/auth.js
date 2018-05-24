const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const errors = require('./error');
const Account = require('../models/Accounts');

//Tạo JWT accesstoken
let createToken = (req, res, next) => {

	req.accessToken = jwt.sign(
		{
			accountId: req.account.accountId,
			accountType: req.account.accountType
		},
		config.secret,
		{
			expiresIn: '3600s'
		}
	);
	next();
};


//Tạo JWT refreshToken
let createRefreshToken = (req, res, next) => {
	
	//if refresh token doesnt exist already. It won't exist when signing up abviously, but when the user logs in they should have one already in the DB. This just adds one in if they haven't (testing mainly). It doesn't always need to be in the /login endpoint route
	
	if (!req.account.refreshToken) {
		req.refreshToken = jwt.sign({ type: 'refresh' }, config.secret, {
			expiresIn: 60 * 60 * 24 * 90
		});
		Account.findOneAndUpdate(
			{ accountId: req.account.accountId },
			{ refreshToken: req.refreshToken }
		)
			.then(() => {
				next();
			})
			.catch(err => {
				console.error(err)
				return errors.errorHandler(res, 
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
					errors.errorEnum.SYSTEM_ERROR
				);
			});
	} else {
		req.refreshToken = req.account.refreshToken;
		next();
	}
};


// Xác minh lại refreshToken
let validateRefreshToken = (req, res, next) => {
	if (req.body.refreshToken != '') {
		Account.findOne({ refreshToken: req.body.refreshToken })
			.then(acc => {
				
				if (!acc) {
					return errors.errorHandler(res, 'RefreshToken không hợp lệ.',errors.errorEnum.WRONG_REFRESH_TOKEN);
				}

				req.account = acc;
				next();

			})
			.catch(err => {
				return errors.errorHandler(res, 
					'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.',
					errors.errorEnum.SYSTEM_ERROR
				);
			});
	} else {
		return errors.errorHandler(res, 'Bạn cần gửi RefreshToken.', errors.errorEnum.WRONG_REQUEST);
	}
};

// Đăng ký tài khoản
let registerAccount = (req, res, next) => {

	//Tạo mã refCode
	let uniqid = require('uniqid');

	//Tạo Account mới
	const newAccount = new Account({
		accountId : req.mobileNumber,
		mobileNumber : req.mobileNumber,
		password : req.hashPassword,
		refCode : uniqid.time().toUpperCase()
	})
	Account.create(newAccount)
		.then(acc => {
			req.account = acc
			next()
		})
		.catch(err => {
			console.error(err)
			return errors.errorHandler(res, 
				'Đã xảy ra lỗi không mong muốn, vui lòng thử lại sau.', 
				errors.errorEnum.SYSTEM_ERROR)
		})
}

// Cập nhật trạng thái online/offline
let updateAccountStatus = (accountId,status) => {
	Account.findOneAndUpdate({accountId: accountId},
		{'$set': {accountStatus : status}},
		{new: true})
	.then (acc=>{
		
	})
}

module.exports = {
	createToken,
	createRefreshToken,
	validateRefreshToken,
	registerAccount,
	updateAccountStatus
};
