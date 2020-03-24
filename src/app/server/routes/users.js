let express = require('express');
let router = express.Router();
let User = require('../models/User');
let passport = require('passport');


router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

async function addToDB(req, res) {
  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({message:'Registration error occured.'});
  }
}

router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({message:'Login error occured'});
    }
    if (!user) {
      return res.status(401).json({message:'User not found'});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({message:'Login error occured'});
      }
      return res.status(200).json({message:'Login Success', userObject: user});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else {
    return res.status(401).json({message:'Unauthorized Request'})
  };
}

module.exports = router;
