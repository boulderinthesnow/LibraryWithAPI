var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/gameDb");
mongoose.set("debug", true);

// pass all the models to app.js by exporting
// receive Game from game.js

module.exports.Game = require("./game");
