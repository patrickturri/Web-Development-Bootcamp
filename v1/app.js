var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
var campgrounds = [
	{
		name: 'Salmon Creek',
		image:
			'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80'
	},
	{
		name: "Mountain Goat's Rest",
		image:
			'https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
	},
	{
		name: 'Salmon Creek',
		image:
			'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80'
	},
	{
		name: "Mountain Goat's Rest",
		image:
			'https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
	},
	{
		name: 'Salmon Creek',
		image:
			'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80'
	},
	{
		name: "Mountain Goat's Rest",
		image:
			'https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
	}
];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.listen(3000, 'localhost', function() {
	console.log('The YelpCamp Server Has Started!');
});
