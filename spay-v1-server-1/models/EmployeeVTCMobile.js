var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    mobileNumber :{
        type: String,
        require: true
    },
    userName: {
        type: String,
        required : true
    },
})

module.exports = mongoose.model('employeeVTCMobile',employeeSchema)