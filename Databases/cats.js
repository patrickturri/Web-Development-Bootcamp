var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true, useUnifiedTopology: true });

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temparament: String
});

var Cat = mongoose.model('Cat', catSchema);

// Adding a new cat to the database

// var george = new Cat({
// 	name: 'Mrs. Norris',
// 	age: 7,
// 	temparament: 'Evil'
// });

// george.save((err, cat) => {
// 	if (err) {
// 		console.log('Something went wrong');
// 	} else {
// 		console.log('We just saved the cat into a database:');
// 		console.log(cat);
// 	}
// });

Cat.create(
	{
		name: 'Palla di Lardo',
		age: 1,
		temparament: 'Macho'
	},
	(err, cat) => {
		if (err) {
			console.log('Error!!');
			console.log(err);
		} else {
			console.log(cat);
		}
	}
);

// Retrieve all cats from the DB and console.log each one

Cat.find({}, (err, cats) => {
	if (err) {
		console.log('Oh no, error');
		console.log(err);
	} else {
		console.log('All the cats....');
		console.log(cats);
	}
});
