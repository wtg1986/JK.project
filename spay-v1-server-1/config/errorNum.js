const SUCCESS = 0
const SYSTEM_ERROR = 999 
const WRONG_REQUEST = 1   //dữ liệu request không đúng 
const ACCOUNT_EXISTS = 2  //tài khoản đã tồn tại
const ACCOUNT_NOT_EXISTS = 3  //tài khoản không tồn tại
const ACCOUNT_WAIT_OTP = 4 //tài khoản đăng ký đang đợi xác thực OTP
const WRONG_PASSWORD = 5 //nhập sai password
const WRONG_REFRESH_TOKEN = 6 //RefreshToken không hợp lệ
const WRONG_OTP = 7 //RefreshToken không hợp lệ
const INVALID_TOKEN = 8 //AccessToken không hợp lệ
const REFCODE_NOT_EXISTS = 9 //Refcode không tồn tại
const REFCODE_IS_USED = 10 //Refcode đã nhận

module.exports = {
    SUCCESS,
    SYSTEM_ERROR,
    WRONG_REQUEST,
    ACCOUNT_EXISTS,
    ACCOUNT_NOT_EXISTS,
    ACCOUNT_WAIT_OTP,
    WRONG_PASSWORD,
    WRONG_REFRESH_TOKEN,
    WRONG_OTP,
    INVALID_TOKEN,
    REFCODE_NOT_EXISTS,
    REFCODE_IS_USED
};
