var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var passport = require('passport');


router.post('/createEvent', function (req, res, next) {
  addToDB(req, res);
});

async function addToDB(req, res) {

  var event = new Event({
    eventTitle: req.body.eventTitle,
    date: req.body.date,
    maxPlayers: req.body.maxPlayers,
    minPlayers: req.body.minPlayers,
    table: req.body.table,
    creation_dt: Date.now()
  });

  try {
    doc = await event.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

router.get('/events', function(req,res,next){
  Event.find({}, function (err, events) {
    if(err){
      res.send('something went wrong')
      next()
    }
    res.json(events);
  });
});

module.exports = router;