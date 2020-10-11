var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image:
// 			'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80',
// 		description:
// 			'Very nice campground, we stayed in campground #1. Sites by the creek is Great and the ones across when the creek has a large grass area within the loop. The sites in the upper part of the loop was not level but close to the bathhouse. Bathhouse was clean with private showers,which is a Big plus.'
// 	},
// 	(err, campground) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('Newly created campground: ');
// 			console.log(campground);
// 		}
// 	}
// );

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

app.get('/campgrounds/:id', (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			// render show template with that provided ID
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(3000, 'localhost', function() {
	console.log('The YelpCamp Server Has Started!');
});
