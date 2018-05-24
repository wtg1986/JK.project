import { serverApi } from '../utils/global';
// import { SkypeIndicator, } from 'react-native-indicators';
// import { View, Modal } from 'react-native';
// import  from '../../assets/pngs'
const _call = (method, accessToken, uri, input, callback) =>{
    
    return fetch(uri, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: accessToken ? 'Bearer ' + accessToken : null
                },
                body: method === 'GET' ? null : JSON.stringify(input),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                                        callback && callback(responseJson)
                                    })
            .catch((error) =>   {
                                    console.error(error);
                                });
}

export const upload = () => {
    // let photo = { uri: source.uri}
    let formdata = new FormData();
    formdata.append('photo', {uri: '../../assets/pngs/logoSpay.png', name: 'photo', type: 'image/png'});
    
    return  fetch('http://localhost:1303/upload', {
                method: 'POST',
                headers: {
                    "Accept": "multipart/form-data",
                    "Content-Type": "multipart/form-data"
                },
                body: formdata
            })
}

//Login cho một User bằng số điện thoại và pass
//input : accountId(SDT), password
//---------------------------------------------------------------------------------------------------
export const authCheckMobile = (input,callback) => {
    const uri = serverApi + '/api/auth/checkMobileNumber'

    return fetch(uri + '?mobileNumber=' + input.mobileNumber).then((response) => response.json())
    .then((responseJson) => {
                                callback && callback(responseJson)
                            })
    .catch((error) =>   {
                            console.error(error);
                        });
}

//Login cho một User bằng số điện thoại và pass
//input : accountId(SDT), password
//---------------------------------------------------------------------------------------------------
export const accountLogin = (input,callback) => {
    const uri = serverApi + '/api/auth/login'
    return _call('POST',null,uri,input,callback)
}

//Đăng ký một User mới với số điện thoại và pass
//input : mobileNumber, password
//---------------------------------------------------------------------------------------------------
export const accountRegister = (input,callback) => {
    const uri = serverApi + '/api/auth/register' 
    return _call('POST',null,uri,input,callback)
}

//Đăng ký một User mới với số điện thoại và pass
//input : mobileNumber, password
//---------------------------------------------------------------------------------------------------
export const accountOTPConfirm = (input,callback) => {
    const uri = serverApi + '/api/auth/OTPConfirm' 
    return _call('POST',null,uri,input,callback)
}

//Lấy thông tin một User
//input : mobileNumber, password
//---------------------------------------------------------------------------------------------------
export const accountGetProfile = (input,token,callback) => {
    const uri = serverApi + '/api/auth/getProfile' 
    // console.log(token)
    return _call('GET',token,uri,input,callback)
}

//Active Refcode nhận thưởng
//input : refCode
//---------------------------------------------------------------------------------------------------
export const accountActiveRefCode = (input,token,callback) => {
    const uri = serverApi + '/api/auth/activeRefCode' 
    // console.log(token)
    return _call('POST',token,uri,input,callback)
}

//Lấy dữ liệu chat của 2 người
//input : accountId
//---------------------------------------------------------------------------------------------------
export const chatGetMessages = (input,token,callback) => {
    const uri = serverApi + '/api/chat/getmessages?accountId=' + input.accountId
    // console.log(token)
    return _call('GET',token,uri,input,callback)
}






//Lấy danh sách các đại lý quanh vị tí hiện tại
//input : latitude,longitude,count
//output : list<accountId, username, avataUri, address, distance, latitude, longitude>
//---------------------------------------------------------------------------------------------------
export const accountAgency = (input,callback) => {
    const uri = serverApi + '/accounts/agency'
    // return _call('GET',uri,input,callback)
    return fetch(uri + '?latitude=' + input.latitude + '&longitude='+ input.longitude +'&count=' + input.count).then((response) => response.json())
    .then((responseJson) => {
                                callback && callback(responseJson)
                            })
    .catch((error) =>   {
                            console.error(error);
                        });
}

//Cập nhật thông tin Profile của tài khoản ví
//input : email, passport, username, address
//---------------------------------------------------------------------------------------------------
export const accountUpdateProfile = (input,callback) => {
    const uri = serverApi + '/accounts/updateProfile'
    return _call('POST',uri,input,callback)
}

//Thực hiện gửi thông tin thanh toán đến đại lý đã chọn
//input : accountId, agencyId, amount, description
//---------------------------------------------------------------------------------------------------
export const accountPaymentAgency = (input,callback) => {
    const uri = serverApi + '/accounts/paymentAgency'
    return _call('POST',uri,input,callback)
}

//Rút tiền ra mã code 
//input : accountId, amount,
//---------------------------------------------------------------------------------------------------
export const accountCashoutCode = (input,callback) => {
    const uri = serverApi + '/accounts/cashoutCode'
    return _call('POST',uri,input,callback)
}

//Nạp tiền từ mã code 
//input : accountId, cashCode,
//---------------------------------------------------------------------------------------------------
export const accountCashinCode = (input,callback) => {
    const uri = serverApi + '/accounts/cashinCode'
    return _call('POST',uri,input,callback)
}

//Cập nhật vị trí 
//input : accountId, latitude, longitude
//---------------------------------------------------------------------------------------------------
export const accountUpdateLocation = (input,callback) => {
    const uri = serverApi + '/accounts/updateLocation'
    return _call('POST',uri,input,callback)
}

//Cập nhật push token
//input : accountId, pushToken
//---------------------------------------------------------------------------------------------------
export const accountUpdatePushToken = (input,callback) => {
    const uri = serverApi + '/accounts/updatePushToken'
    return _call('POST',uri,input,callback)
}

//Chuyển khoản cho tài khoản khác
//input : accountId, partnerId, amount
//---------------------------------------------------------------------------------------------------
export const accountTranferMoney = (input,callback) => {
    const uri = serverApi + '/accounts/tranferMoney'
    return _call('POST',uri,input,callback)
}

//Kiểm tra mã code
//input : cashCode,
//---------------------------------------------------------------------------------------------------
export const accountCheckCode = (input,callback) => {
    const uri = serverApi + '/accounts/checkCode'
    return fetch(uri + '?cashCode=' + input.cashCode).then((response) => response.json())
    .then((responseJson) => {
                                callback && callback(responseJson)
                            })
    .catch((error) =>   {
                            console.error(error);
                        });
}