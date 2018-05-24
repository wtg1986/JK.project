var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var registerSchema = new Schema({
    mobileNumber :{
        type: String,
        require: true
    },
    hashPassword: {
        type: String,
        required : true
    },
    otpId : {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('registerOrders',registerSchema)