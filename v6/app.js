var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	seedDb = require('./seeds');

seedDb();
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// PASSPORT CONFIGURATION
app.use(
	require('express-session')({
		secret: 'Once again Rusty wins cutest dog!',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX ROUTE = show all campgrounds

app.get('/campgrounds', function(req, res) {
	console.log(req.user);
	// Get all campgrounds from DB
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds });
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
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that provided ID
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

// ==============================
// COMMENTS ROUTES
// ==============================

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
	// find campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
	// lookup campground using ID
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			// create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					// connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					// redirect campground sho page
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});
// ============
// AUTH ROUTES
// ============

//show register form
app.get('/register', function(req, res) {
	res.render('register');
});
// handle sign up logic
app.post('/register', (req, res) => {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/campgrounds');
		});
	});
});

// show login form
app.get('/login', (req, res) => {
	res.render('login');
});
// handling login logic
app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

// logic route
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, 'localhost', function() {
	console.log('The YelpCamp Server Has Started!');
});
