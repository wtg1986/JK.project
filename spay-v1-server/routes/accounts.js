var express = require('express');
var router = express.Router();
var account = require('../models/accountModel')
var cashOut = require('../models/cashOut')
var distance = require('google-distance-matrix');
var remotePush = require('../utils/remotePush') 

//Lấy toàn bộ danh sách Account
//---------------------------------------------------------------------------------------------------
router.get('/', (req, res, next) => {
  
  account.find({}).limit(100).sort({createTime:1}).select({
    // accountId: 1,
    // accountType: 1,
    // mobileNumber: 1,
    // avataUrl: 1
  }).exec((err,acc)=>{
    if (err){
      res.jscon({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
    } else {
      res.json({
        error : 0,
        data : acc,
        message: `successfully` 
      })
    }
  })
});

//Đăng ký một User mới với số điện thoại và pass
//input : mobileNumber, password
//---------------------------------------------------------------------------------------------------
router.post('/register', (req, res, next) => {
  //Kiểm tra tài khoản số điện thoại này đã có chưa ?
  account.findOne({mobileNumber:req.body.mobileNumber},(err,acc)=>{
    if (err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
      return;
    }
    if (acc!==null){
      res.json({
        error: 1,
        data: null,
        message: `Tài khoản đã tồn tại`
      })
      return;
    }
  })

  //Tạo mã refCode
  let uniqid = require('uniqid');

  //Tạo Account mới
  const newAccount = new account({
    accountId : req.body.mobileNumber,
    mobileNumber : req.body.mobileNumber,
    password : req.body.password,
    refCode : uniqid.time()
  })

  //Save xuống DB
  newAccount.save(err=>{
    if (err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
    } else {
      res.json({
        error: 0,
        data: null,
        message: `successfully` 
      })
    }
  })
});

//Login cho một User bằng số điện thoại và pass
//input : accountId(SDT), password
//---------------------------------------------------------------------------------------------------
router.post('/login', (req, res, next) => {
  let resObj = {}
  account.findOne({accountId:req.body.accountId},(err,acc)=>{
    if (err)
      resObj = {
        error: 999,
        data: null,
        message: `error is: ${err}`
      }
    else {

      if (acc === null || acc.password !== req.body.password) 
        resObj = {
          error : 2,
          data : null,
          message: 'account không tồn tại hoặc sai mật khẩu'
        }
      else
        resObj = {
          error: 0,
          data:acc,
          message: 'successfully'
        }
    }
    res.json(resObj)
  })
})

//Lấy danh sách các đại lý quanh vị tí hiện tại
//input : latitude,longitude,count
//output : list<accountId, username, avataUri, address, distance, latitude, longitude>
//---------------------------------------------------------------------------------------------------
router.get('/agency', (req, res, next) => {

  let {latitude,longitude,count} = req.query

  // console.log(latitude,longitude,count)
  
  let resObj = {}

  //Thư viên google
  let distance = require('google-distance-matrix');
  distance.key('AIzaSyD21uIobf7m6WnCHxA9BidJrCIAS9I8h1w');
  distance.units('metric');

  //Điểm hiện tại 
  var origins = [`${latitude.toString()}, ${longitude.toString()}`];
  // console.log(origins)
  
  account.find({accountType:'agency'}).limit(50).select({
    accountId: 1,
    username: 1,
    avataUrl: 1,
    latitude: 1,
    longitude: 1
  }).exec((err,acc)=>{
    if (err){
      resObj = {
        error: 999,
        data: null,
        message: `error is: ${err}`
      }
    } else {

      let data = []
      let dist = []
      let destinations = []
      
      acc.map((ar,i)=>{
        destinations.push(`${ar.latitude}, ${ar.longitude}`)
      })
      
      // console.log(destinations)

      distance.matrix(origins, destinations, function (err, distances) {
        if (err || !distances) {

        }
        console.log(distances)
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                      var distance = distances.rows[i].elements[j].distance.text;
                      // console.log('Khoảng cách từ [' + origin + '] đến [' + destination + '] là: ' + distance);
                      dist[j] = {
                        address: destination,
                        distance: distance,
                      }
                    } else {
                      dist[j] = {
                        address: destination,
                        distance: '--',
                      }
                    } 
                } 
            }
        }
        
        for (var j = 0; j < destinations.length; j++) {
          data[j] = {
            accountId: acc[j].accountId,
            username: acc[j].username,
            avataUri: acc[j].avataUrl,
            address: dist[j].address ? dist[j].address : '--',
            distance: dist[j].distance ? dist[j].distance : '--',
            latitude: acc[j].latitude,
            longitude: acc[j].longitude,
          }
        }

        resObj = {
          error: 0,
          data: data,
          message: `successfully`
        }

        res.json(resObj)
        
      });
    }
    
  })

})

//Cập nhật thông tin Profile của tài khoản ví
//input : email, passport, username, address
//---------------------------------------------------------------------------------------------------
router.post('/updateProfile', (req, res, next) => {
  let resObj = {}
  account.findOneAndUpdate({ "accountId": req.body.accountId }, { "$set": { 
        "email": req.body.email, 
        "passport": req.body.passport, 
        "username": req.body.username, 
        "address": req.body.address}})
      .exec((err, acc) => {
        if(err) {
          console.log(err);
          res.json({
            error: 999,
            data: null,
            message: `error is: ${err}`
          })
        } else {
          res.json({ error:0,
            data: null,
            message: `successfully`});
        }
      });
})

//Thực hiện gửi thông tin thanh toán đến đại lý đã chọn
//input : accountId, agencyId, amount, description
//---------------------------------------------------------------------------------------------------
router.post('/paymentAgency', (req, res, next) => {
  let { accountId, agencyId, amount, description } = req.body
  
  //Tìm đại lý
  account.findOne({accountId : agencyId},(err,acc)=>{
    
    //Nếu lỗi
    if (err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
      return;
    }

    //Push notification đến đại lý
    remotePush([{
      pushToken: acc.pushToken,
      title: `SĐT ${accountId} muốn nạp ${amount}đ`,
      body: description
    }])

    //Gửi kết quả về client
    res.json({ error:0,
              data: null,
              message: `successfully`});
  })
})

//Rút tiền ra mã code 
//input : accountId, amount,
//---------------------------------------------------------------------------------------------------
router.post('/cashoutCode', (req, res, next) => {
  let { accountId, amount } = req.body
  
  //Tìm User
  account.findOne({accountId:accountId},(err,acc)=>{
     
    //Nếu lỗi
     if (err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
      return;
    }

    //Tạo code rút tiền
    let uniqid = require('uniqid')('cash-');
    
    //Tạo giao dịch rút tiền
    const newCashOut = new cashOut({
      accountId : accountId,
      cashCode : uniqid,
      amount : amount,
    })

    newCashOut.save(err=>{
      if (err) {
        res.json({
          error: 999,
          data: null,
          message: `error is: ${err}`
        })
      } else {
        
        //Trừ tiền của người rút
        account.findOneAndUpdate({"accountId": accountId}, {"$set": {"balance": acc.balance - amount}})
              .exec((err, acc) => {
                if(err) {
                  res.json({
                    error: 999,
                    data: null,
                    message: `error is: ${err}`
                  })
                } else {
                  res.json({
                    error: 0,
                    data: uniqid,
                    message: `successfully` 
                  })
                }
              });
      }
    })

  })
})

//Nạp tiền từ mã code 
//input : accountId, cashCode,
//---------------------------------------------------------------------------------------------------
router.post('/cashinCode', (req, res, next) => {
  let { accountId, cashCode } = req.body
  
  //Lấy CashCode
  cashOut.findOne({cashCode:cashCode, state: 0},(err,code)=>{
    
    //Nếu lỗi
    if (err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
      return;
    }

    //Lấy người nạp
    account.findOne({accountId:accountId},(err,acc)=>{

      //Nếu lỗi
      if (err) {
        res.json({
          error: 999,
          data: null,
          message: `error is: ${err}`
        })
        return;
      }

      //Cập nhật mã code
      cashOut.findOneAndUpdate({"cashCode": cashCode}, {"$set": {"state":1}})
      .exec((err, c) => {
          if(err) {
            res.json({
              error: 999,
              data: null,
              message: `error is: ${err}`
            })
            return;
          }
        
          // Cập nhật tiền người nạp
          account.findOneAndUpdate({"accountId": accountId}, {"$set": {"balance": acc.balance + code.amount}})
          .exec((err, ac) => {
            if(err) {
              res.json({
                error: 999,
                data: null,
                message: `error is: ${err}`
              })
              return;
            }

            //Sucessfully
            res.json({
              error: 0,
              data: {accountId: accountId, balance: acc.balance + code.amount },
              message: `Sucessfully`
            })
            return;

          })
      });
    })
  })
})

//Cập nhật vị trí 
//input : accountId, latitude, longitude
//---------------------------------------------------------------------------------------------------
router.post('/updateLocation', (req, res, next) => {

  let { accountId, latitude, longitude } = req.body

  account.findOneAndUpdate({ "accountId": accountId }, { "$set": {
    "latitude": latitude, 
    "longitude": longitude}})
  .exec((err, acc) => {
    if(err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
    } else {
      res.json({
        error: 0,
        data: null,
        message: `successfully` 
      })
    }
  });

})

//Cập nhật push token
//input : accountId, pushToken
//---------------------------------------------------------------------------------------------------
router.post('/updatePushToken', (req, res, next) => {
  let { accountId, pushToken } = req.body

  account.findOneAndUpdate({ "accountId": accountId }, { "$set": {
    "pushToken": pushToken}})
  .exec((err, acc) => {
    if(err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
    } else {
      res.json({
        error: 0,
        data: null,
        message: `successfully` 
      })
    }
  });
})

//Chuyển khoản tiền cho người khác
//input : accountId, partnerId, amount
//---------------------------------------------------------------------------------------------------
router.post('/tranferMoney', (req, res, next) => {

  let { accountId, partnerId, amount } = req.body
  let resObj = {}

  account.findOneAndUpdate({ "accountId": accountId }, { "$inc": {
    "balance": -amount}})
  .exec(err => {
    if(err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
    } else {
      account.findOneAndUpdate({ "accountId": partnerId }, { "$inc": {
        "balance": amount}})
      .exec(err => {
        if(err) {
          res.json({
            error: 999,
            data: null,
            message: `error is: ${err}`
          })
        } else {
          res.json({
            error: 0,
            data: null,
            message: `successfully`
          })
        }
      });
    }})
})

//Check QR-CODE
//input : cashCode
//---------------------------------------------------------------------------------------------------
router.get('/checkCode', (req, res, next) => {
  let {cashCode} = req.query
 
  cashOut.findOne({cashCode:cashCode},(err,code)=>{
    
    if (err) {
      res.json({
        error: 999,
        data: null,
        message: `error is: ${err}`
      })
      return
    }
    
    if (code === null) {
      res.json({
        error: 3,
        data: null,
        message: `Mã Code không tồn tại`
      })
      return
    }

    if (code.state === 1) {
      res.json({
        error: 4,
        data: null,
        message: `Mã code này đã sử dụng`
      })
      return
    }
    res.json({
      error: 0,
      data: code,
      message: `successfully`
    })
  })
})

module.exports = router;
