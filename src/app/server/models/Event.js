var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    eventTitle : {type:String, require:true},
    startTime : {type:Date, require:true},
    endTime : {type:Date, require:true},
    resources : {type:Date, require:true},
    minPlayers : {type:Number, require:true},
    maxPlayers : {type:Number, require:true},
    minPlayers : {type:Number, require:true},
    isOpen : {type:Boolean, require:true},
    currentPlayers : [],
    creation_dt:{type:Date, require:true}
});

module.exports = mongoose.model('Event',schema);