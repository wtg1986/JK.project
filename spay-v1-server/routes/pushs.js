var express = require('express');
var account = require('../models/accountModel')
var router = express.Router();

router.post('/tokenRemotePush', (req, res, next) => {
    let { accountId,tokenRemotePush } = req.body
    let resObj = {}
    account.findOneAndUpdate({ "accountId": accountId }, { "$set": { 
                "pushToken": tokenRemotePush}})
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
});

// router.post('/tokenRemotePush', (req, res, next) => {
//     let { accountId,tokenRemotePush } = req.body
//     let resObj = {}
// })

module.exports = router;
