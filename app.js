// assign all node modules
// use node modules
// assign view engine

var express = require("express"),
app = express(),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
morgan = require("morgan")
db = require("./models");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

// ROUTES


// ROOT
app.get("/" , function(req, res) {
	res.redirect("/games")
})

//index
app.get("/games", function(req, res) {
	db.Game.find({}, function(err, games) {
		if (err) throw err
		res.render("games/index", {games:games})
	})
})

//NEW
app.get("/games/new", function(req, res) {
	res.render("games/new")
})

//CREATE
app.post("/games", function(req, res) {
	console.log("foo")
	var game = new db.Game(req.body.game)
	game.save(function(err){
		if (err) throw err
			res.redirect("/games")
	})
	
})

// SHOW
app.get("/games/:id", function (req, res) {
	var id = req.params.id
	console.log(id, "id ##############")
	db.Game.findById(id, function (err, game) {
		if (err) throw err
			else {
				res.render("games/show.ejs", {game:game})
			}


	})
})

// EDIT 
app.get("/games/:id/edit", function (req, res) {
	db.Game.findById(req.params.id, function (err, game) {
		if (err) throw err
			else {
				res.render("games/edit.ejs", {game:game})
			}
	})
})

// UPDATE 
app.put("/games/:id", function (req, res) {
	var id = req.params.id
	// find and edit on db
	// return to main page with all ids
	db.Game.findByIdAndUpdate(id, req.body.game, function (err, data){
		res.redirect("/games")
	})
})

// DESTROY
app.delete("/games/:id", function (req, res) {
	var id = req.params.id
	db.Game.findByIdAndRemove(id, req.body.game, function (err, data) {
		res.redirect("/games")
	})
})


app.listen(3000, function(){
	"Server be servin' at 3000"
})