var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var passport = require('passport');


router.post('/createEvent', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var event = new Event({
    evenTitle: req.body.eventTitle,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    maxPlayers: req.body.maxPlayers,
    minPlayers: req.body.minPlayers,
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

module.exports = router;