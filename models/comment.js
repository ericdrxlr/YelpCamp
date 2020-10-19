const mongoose 	= require('mongoose'); // = object data mapper(odm), i.e. allows us to write js and send info to db


// creates expected attributes of our object for the database to anticipate(not fixed)
var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

// instantiates a model in JS to use the catSchema format
// and creates methods to behave with our object(i.e. crud)
module.exports = mongoose.model("Comment", commentSchema);