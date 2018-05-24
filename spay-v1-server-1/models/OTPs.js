const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
    otpId :{
        type: String,
        require: true
    },
    otpType: {
        type: String,
        required : true
    },
    otpCode : {
        type: String,
        required : true
    },
    expTime : {
        type: Date,
    }
})
OTPSchema.plugin(AutoIncrement, {inc_field: 'otpId'});
module.exports = mongoose.model('OTPs',OTPSchema)