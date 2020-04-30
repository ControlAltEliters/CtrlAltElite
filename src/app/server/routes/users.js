let express = require('express');
let router = express.Router();
let User = require('../models/User');
let passport = require('passport');
let mongoose = require('mongoose');
const Role = require('../helpers/role');

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

router.post('/registerAdmin', function (req, res, next) {
  addToDBAdmin(req, res);
});

async function addToDB(req, res) {
  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    role: Role.User,
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

async function addToDBAdmin(req, res) {
  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    role: Role.Admin,
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

router.get('/listofusers', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.send('something went wrong')
      next()
    }
    res.json(users);
  });
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

router.post('/editprofile',isValidUser, function(req,res,next){
  try {
    User.findOneAndUpdate(
    {_id: req.body.userId }, {
      $set: {
        firstname: req.body.editFirstName,
        lastname: req.body.editLastName,
        email: req.body.editEmail
      }
    }, function (err,doc) {
        if (err) {
          console.log('Profile edit error: ' + err)
          return res.status(500).json({message:'Updated user failed'});
        } else {
          console.log('Updated profile: ' + doc)
          return res.status(200).json({message:'Updated user', userObject: doc});
        }
      }
    )
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({message:'Updated user failed'});
  }
})

router.get('/updatepic', isValidUser, function (req, res, next) {
  try {
    User.findOneAndUpdate(
      { _id: req.query.id }, {
      $set: {
        userImage: JSON.parse(req.query.value),
      }
    }, function (err, doc) {
      if (err) {
        return res.status(500).json({ message: 'Updated profile picture failed' });
      } else {
        return res.status(200).json({ message: 'Updated profile picture', userObject: doc });
      }
    }
    )
  }
  catch (err) {
    // console.log(err);
    return res.status(500).json({ message: 'Updated password failed' });
  }
})

router.get('/updatepassword', isValidUser, function (req, res, next) {
  try {
    User.findOneAndUpdate(
      { _id: JSON.parse(req.query.id) }, {
      $set: {
          password: User.hashPassword(JSON.parse(req.query.newpass)),
      }
    }, function (err, doc) {
      if (err) {
        // console.log('Update password error: ' + err)
        return res.status(500).json({ message: 'Updated password failed' });
      } else {
        // console.log('Updated password: ' + doc)
        return res.status(200).json({ message: 'Updated password', userObject: doc });
      }
    }
    )
  }
  catch (err) {
    // console.log(err);
    return res.status(500).json({ message: 'Updated password failed' });
  }
})

router.get('/verifypassword', isValidUser, function (req, res, next) {
  return res.status(200).json({ result: User.verify(req.query.password, req.user.password), newpass: req.query.newpass, confnewpass: req.query.confnewpass, id: req.query.id});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else {
    return res.status(401).json({message:'Unauthorized Request'})
  };
}

module.exports = router;
