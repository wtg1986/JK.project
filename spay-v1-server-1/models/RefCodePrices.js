const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const RefCodePriceChema = new Schema({
    tranId : {
        type: Number,
        require: true
    },
    accountId1 : {
        type: String,
        required : true
    },
    accountId2 : {
        type: String,
        required : true
    },
    price : {
        type: Number,
        required : true,
    }
})
RefCodePriceChema.plugin(AutoIncrement, {inc_field: 'tranId'});
module.exports = mongoose.model('refCodePrices',RefCodePriceChema)