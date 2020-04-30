let mongoose = require('mongoose');
var friends = require("mongoose-friends")
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
const Role = require('../helpers/role');


let schema = new Schema({
    firstname :   {type:String, require:true},
    lastname :    {type:String, require:true},
    email :       {type:String, require:true, index: true, unique: true},
    username :    {type:String, require:true, index: true, unique: true},
    password :    {type:String, require:true},
    role: {type:Role, require: true},
    creation_dt : {type:Date, require:true},
    userImage : {type:String, require:true},// "1" = Bulbasaur "2" = Charmander "3" = eevee "4" = Jigglypuff "5" = Meowth "6" = pikachu "7"=Snorlax
    friends: [{ type: String}],
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.statics.verify = function verify(password1, password2) {
  return bcrypt.compareSync(password1, password2);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);
