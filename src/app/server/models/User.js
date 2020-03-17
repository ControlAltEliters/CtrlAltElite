let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let schema = new Schema({
    firstname :   {type:String, require:true},
    lastname :    {type:String, require:true},
    email :       {type:String, require:true, index: true, unique: true},
    username :    {type:String, require:true, index: true, unique: true},
    password :    {type:String, require:true},
    creation_dt : {type:Date, require:true}
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);
