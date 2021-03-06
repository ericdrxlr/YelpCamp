const express = require('express'),
      router = express.Router(),
	  passport = require('passport'),
	  User	   = require('../models/user');


// AUTH ROUTES
// ===========

// 'NEW' sign up form
router.get("/register", (req, res)=>{
	res.render('register');
});

//' POST' SIGN UP LOGIC
router.post("/register", (req, res)=>{
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.render('register');
		}
		passport.authenticate("locale")(req, res, ()=>{
			req.flash("success", "Welcome to YelpCamp" + user.username);
			res.redirect("/campgrounds");
		})
	});	
});

// 'NEW' login form
router.get("/login", (req, res)=>{
	res.render('login');
})

// POST login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), (req, res)=>{
});

// LOGOUT
router.get("/logout", (req, res)=>{
	req.logout();
	req.flash("success", "Logged You Out!");
	res.redirect("/campgrounds");
});

module.exports = router;