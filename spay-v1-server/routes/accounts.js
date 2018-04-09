var express = require('express');
var router = express.Router();
let account = require('../models/accountModel')

/* GET accounts listing. */
router.get('/', (req, res, next) => {
  account.find({}).limit(100).sort({createTime:1}).select({
    accountId: 1,
    accountType: 1,
    mobileNumber: 1,
    avataUrl: 1
  }).exec((err,acc)=>{
    if (err){
      res.jscon({
        result: 'failed',
        data:{},
        message: `error is: ${err}`
      })
    } else {
      res.json({
      result : 'ok',
        data : acc,
        message: `successfully` 
      })
    }
  })
});

router.post('/register', (req, res, next) => {
  //kiểm tra tài khoản số điện thoại này đã có chưa ?
  account.findOne({mobileNumber:req.body.mobileNumber},(err,acc)=>{
    if (err) {
      res.json({
        result: 'failed',
        data:{},
        message: `error is: ${err}`
      })
      return;
    }
    if (acc!==null){
      res.json({
        result: 'failed',
        data:{},
        message: `Tài khoản đã tồn tại`
      })
      return;
    }
  })

  //Tạo Account mới
  const newAccount = new account({
    accountId : req.body.mobileNumber,
    mobileNumber : req.body.mobileNumber,
    password : req.body.password
  })
  newAccount.save(err=>{
    if (err) {
      res.json({
        result: 'failed',
        data:{},
        message: `error is: ${err}`
      })
    } else {
      res.json({
        result: 'ok',
        data:{
          accountId : req.body.mobileNumber,
          mobileNumber : req.body.mobileNumber,
        },
        message: `register successfully` 
      })
    }
  })
});

router.post('/login', (req, res, next) => {
  let resObj = {}
  account.findOne({accountId:req.body.accountId},(err,acc)=>{
    if (err){
      resObj = {
        result: 'failed',
        data:null,
        message: `error is: ${err}`
      }
    } else {
      
      if (acc === null || acc.password !== req.body.password) 
      resObj = {
        result: 'failed',
        data:null,
        message: 'account không tồn tại hoặc sai mật khẩu'
      }
      else
      resObj = {
        result: 'ok',
        data:acc,
        message: 'đăng nhập thành công'
      }
      res.json(resObj)
    }
  })
})

module.exports = router;
