var mongoose = require('mongoose'),
    Db = require('../database.js');

var playerSchema = new mongoose.Schema({
    name: String,
    cards: Array,
    total: Number
});

var Player = Db.db.model('Player', playerSchema);

exports.Player = Player;