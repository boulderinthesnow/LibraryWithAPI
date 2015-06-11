var mongoose = require("mongoose");
var gameSchema = new mongoose.Schema({
	name: {type: String, required: true},
	date: String,
	platform: String,
	photo: String
});

var Game = mongoose.model("Game", gameSchema);
module.exports = Game;
