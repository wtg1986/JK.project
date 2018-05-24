const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    chatId : {
        type: String,
        require: true
    },
    accountId_one :{
        type: String,
        require: true
    },
    accountId_two :{
        type: String,
        require: true
    },
    messageData: {
        type: Array,
        required : true
    },
})
chatMessageSchema.plugin(AutoIncrement, {inc_field: 'chatId'});
module.exports = mongoose.model('chatMessages',chatMessageSchema)