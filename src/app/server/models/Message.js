let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    sender : {type:String, require:true},
    messageContent : {type:String, require:true},
    timeSent: {type:Date, default: Date.now, require:true},
});

module.exports = mongoose.model('Message',schema, 'messages');