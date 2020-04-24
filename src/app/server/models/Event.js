let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    eventTitle : {type:String, require:true},
    date : {type:Date, require:true},
    startTime : {type:Number, require:true},
    endTime : {type:Number, require:true},
    resources : {type:String, require:true},
    description: {type:String, require:true},
    maxPlayers : {type:Number, require:true},
    minPlayers : {type:Number, require:true},
    table: { type: String},
    isOpen : {type:Boolean, require:true},
    currentPlayers :{type: Array, require: true},
    playersIDs: {type: Array, require: true},
    creation_dt:{type:Date, require:true},
    eventID: {type: String},
    eventCreator: {type: String},
    messageBoard: [],
});

module.exports = mongoose.model('Event',schema, 'events');
