var mongoose = require('mongoose')
var schema = mongoose.Schema;

var cashOutSchema = new schema({
    accountId :{
        type: String,
        require: true
    },
    cashCode: {
        type: String,
        required : true
    },
    amount:{
        type: Number,
        default: 0
    },
    state:{
        type: Number,
        default: 0
    },
    //Thêm expDate

    createTime:{
        type: Date,
        default: Date.now
    }
})

// accountSchema.path('username').set(inputString =>{
//     return inputString[0].toUpperCase() + inputString.slice(1);
// })

module.exports = mongoose.model('cashOuts',cashOutSchema)