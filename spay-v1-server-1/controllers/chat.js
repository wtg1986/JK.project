const _ = require('lodash');
const errors = require('./error');
const ChatMessage = require('../models/ChatMessages');

let insertChatMessage = (data) => {
    let {fromAccountId, toAccountId, message} = data

    ChatMessage.find({ $or: [ { accountId_one: fromAccountId, accountId_two: toAccountId }, 
                                { accountId_one: toAccountId, accountId_two: fromAccountId } ] })
                .then(mess => {

                    //nếu chưa tồn tại dữ liệu chát giữa 2 người này.
                    if (mess.length === 0) {

                        const newChatMessage = new ChatMessage({
                            accountId_one : fromAccountId,
                            accountId_two : toAccountId,
                            messageData : [{
                                message : message,
                                from : fromAccountId,
                                time : Date.now()
                            }]
                        })
                        ChatMessage.create(newChatMessage)
                            .then(chatMess => {
                                
                            })
                            .catch(err => {
                                console.error(err)
                            })

                    } else {

                        let newMessData = [...mess[0].messageData, {
                            message : message,
                            from : fromAccountId,
                            time : Date.now()
                        }]
                
                        ChatMessage.findOneAndUpdate({chatId: mess[0].chatId},
                            {'$set': {
                                messageData : newMessData
                            }},
                            {new: true})
                        .then (acc=>{
                            
                        })
                        .catch (err => {
                            console.error(err)
                        })
                    }
                })
                
}

module.exports = {
	insertChatMessage
};
