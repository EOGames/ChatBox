const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ChatBox');

const schema = new mongoose.Schema(
    {
        roomName: String,
        chatObject: {
            sessionId: String,
            userName:String,
            userMsg: String,
            msgTime:String
        }
    });

    const ChatModel = mongoose.model('chatList',schema);
module.exports = ChatModel ;