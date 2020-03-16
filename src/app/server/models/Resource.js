let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name : {type:String, require:true, lowercase:true},
    type : {type:String, require:true, lowercase:true},
    owner : {type:String},
    isAvailable : {type:Boolean, require:true}
});

module.exports = mongoose.model('Resource',schema);
