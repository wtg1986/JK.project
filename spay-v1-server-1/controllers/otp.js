
const axios = require('axios');


//Gửi SMS tới số điện thoại.
let sentSMS = (sendData, onSuccess, onError) => {
    // http://api.speedsms.vn/index.php/sms/send
    // Authorization:Basic cjM2ZnppQUtodmF1RjVfQmJTY2YtZjZmaEtKam5Nc0s6eA==
    // Content-Type:application/x-www-form-urlencoded
    // {"to": ["0968434969"], "content": "chụtttttttttttt", "sms_type": 2, "sender": ""}
        

    const url = 'http://api.speedsms.vn/index.php/sms/send'
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic cjM2ZnppQUtodmF1RjVfQmJTY2YtZjZmaEtKam5Nc0s6eA=='
        }
      };

    axios.post(url, {
        to: [sendData.mobileNumber],
        content: sendData.message, //`Mã OTP đăng ký tài khoản Spay của bạn là: ${req.otp.otpCode} (có hiệu lực 3 phút)` ,
        sms_type: 2,
        sender: ''
    },config)
        .then(function (response) {
            console.log(response.data);
            onSuccess&&onSuccess(response)
        })
        .catch(function (error) {
            console.error(error);
            onError&&onError(error)
        });

}

//Check mã OTP
let checkOTP = (otpId,otpCode) => {

}

module.exports = {
	sentSMS
};




