let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    eventTitle : {type:String, require:true},
    date : {type:Date, require:true},
  //  startTime : {type:Date, require:true},
  //  endTime : {type:Date, require:true},
    //resources : {type:Date, require:true},
    maxPlayers : {type:Number, require:true},
    minPlayers : {type:Number, require:true},
    table: { type: String},
    //isOpen : {type:Boolean, require:true},
    //currentPlayers : [],
    creation_dt:{type:Date, require:true}
});

module.exports = mongoose.model('Event',schema);
