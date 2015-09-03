var Mongoose = require('mongoose'),
    config = require('./config');
Mongoose.connect('mongodb://' + config.database.username + ":" + config.database.password + "@" + config.database.host + ':' + config.database.port + '/' + config.database.db);
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});
//Mongoose.set('debug', true);

exports.Mongoose = Mongoose;
exports.db = db;