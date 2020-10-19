const mongoose 	= require('mongoose'); // = object data mapper(odm), i.e. allows us to write js and send info to db


// creates expected attributes of our object for the database to anticipate(not fixed)
var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// instantiates a model in JS to use the catSchema format
// and creates methods to behave with our object(i.e. crud)
module.exports = mongoose.model("Campground", campgroundSchema);