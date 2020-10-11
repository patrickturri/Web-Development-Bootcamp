var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	seedDb = require('./seeds');

seedDb();
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX ROUTE = show all campgrounds

app.get('/campgrounds', function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allCampgrounds });
		}
	});
});

// CREATE ROUTE = add new campground to database
app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = { name: name, image: image, description: desc };
	// create a new campground and save it to DB
	Campground.create(newCampground, (err, new_camp) => {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

// NEW = show form to create new campground
app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

// SHOW = shows info about one campground

app.get('/campgrounds/:id', (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that provided ID
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(3000, 'localhost', function() {
	console.log('The YelpCamp Server Has Started!');
});
