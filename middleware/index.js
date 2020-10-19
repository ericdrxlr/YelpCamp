const Campground 	= require('../models/campground'),
	  Comment 		= require('../models/comment');

// middleware goes here

const middlewareObj = {};

//check if campground is users
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
	Campground.findById(req.params.id, (err, foundCampground)=>{
		if(err) {
			res.redirect("back");
		} else {
			if(foundCampground.author.id.equals(req.user._id)) {
				next();
			} else {
				req.flash("error", "That'a not your campground!");
				res.redirect("back");
			}
		}
	});
	} else {
		res.redirect("back");
	}
};

// check if comment is users
middlewareObj.checkCommentOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
	Comment.findById(req.params.comment_id, (err, foundComment)=>{
		if(err) {
			res.redirect("back");
		} else {
			if(foundComment.author.id.equals(req.user._id)) {
				next();
			} else {
				req.flash("error", "That's not your comment!");
				res.redirect("back");
			}
		}
	});
	} else {
		res.redirect("back");
	}
};

// check if user is logged in
middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You must be logged in to access that!");
	res.redirect("/login");
};

module.exports = middlewareObj;