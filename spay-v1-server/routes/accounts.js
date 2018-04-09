var express = require('express');
var router = express.Router();
let account = require('../models/accountModel')
var distance = require('google-distance-matrix');

/* GET accounts listing. */
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
  var uniqid = require('uniqid');

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
          result: 0,
          data:acc,
          message: 'successfully'
        }
    }
    res.json(resObj)
  })
})

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
    avataUri: 1,
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
            avataUri: acc[j].avataUri,
            address: dist[j].address ? dist[j].address : '--',
            distance: dist[j].distance ? dist[j].distance : '--',
            latitude: acc[j].latitude,
            longitude: acc[j].longitude,
          }
        }

        resObj = {
          result: 'ok',
          data: data,
          message: `successfully`
        }

        res.json(resObj)
        
      });
    }
    
  })

})

router.post('/updateProfile', (req, res, next) => {
  let resObj = {}
  account.findOneAndUpdate({ "accountId": req.body.accountId }, { "$set": { 
        "email": req.body.email, 
        "passport": req.body.passport, 
        "username": req.body.username, 
        "address": req.body.address}})
      .exec((err, book) => {
        if(err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(book);
        }
      });
})

module.exports = router;
