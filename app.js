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


	res.render("games/index")
})

//NEW
app.get("/games/new", function(req, res) {
	res.render("games/new")
})

//CREATE
app.post("/games", function(req, res) {
	var game = new db.Game(req.body.game)
	game.save(function(err){
		if (err) throw err
			res.redirect("/")
	})
	
})

// SHOW
app.get("games/:id", function(req, res) {

})

// EDIT 

// UPDATE 

// DESTROY


app.listen(3000, function(){
	"Server be servin' at 3000"
})