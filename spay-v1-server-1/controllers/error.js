const errorHandler = (res, errorMessage, errorCode) => {
	if (errorCode === errorEnum.INVALID_TOKEN) {
		return res.status(403).send({
			success: false,
			message: errorMessage,
			code: errorCode
		});
	} else {
		return res.status(400).send({
			success: false,
			message: errorMessage,
			code: errorCode
		});
	}
};
const errorEnum = require('../config/errorNum')

module.exports = {
	errorHandler,
	errorEnum
};
