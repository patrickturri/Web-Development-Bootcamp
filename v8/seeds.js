var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: 'Cluds Rest',
		image:
			'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		description: 'blah blah blah'
	},
	{
		name: 'Desert Masa',
		image:
			'https://images.unsplash.com/photo-1519981337-7295e387c157?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		description: 'blah blah blah'
	},
	{
		name: 'Canyon Floor',
		image:
			'https://images.unsplash.com/photo-1494137319847-a9592a0e73ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80',
		description: 'blah blah blah'
	}
];

function seedDb() {
	// Remove all campgrounds
	Campground.remove({}, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('removed campgrounds!');
			// add a few campgrounds
			for (var i = 0; i < data.length; i++) {
				Campground.create(data[i], (err, data) => {
					if (err) {
						console.log(err);
					} else {
						console.log('added a campground');
						// create a comment
						Comment.create(
							{
								text: 'This is place is great, but I wish there was internet',
								author: 'Homer'
							},
							(err, comment) => {
								if (err) {
									console.log(err);
								} else {
									data.comments.push(comment);
									data.save();
									console.log('Created a new Campground');
								}
							}
						);
					}
				});
			}
		}
	});
}

module.exports = seedDb;
