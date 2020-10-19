const express 		= require('express'),
      router 		= express.Router(),
	  Campground 	= require('../models/campground'),
	  Comment 		= require('../models/comment'),
	  middleware 	= require('../middleware');

// 5th step - set up main page INDEX ROUTE
router.get("/", (req, res) => {
	// get all campgrounds from DB and send to url above
	Campground.find({}, (err, allcampgrounds)=>{
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
	});
});

// 6th step - set up post/ add campgrounds to website CREATE ROUTE
router.post("/", middleware.isLoggedIn, (req, res) => {
	// get data from form and add to DB
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username	
	}
	var newCampground = {name:name, price:price, image:image, description:description, author:author};
	Campground.create(newCampground, (err, newlyCreated)=>{
		if(err){
			console.log(err)
		} else {
			req.flash("success", "Congrats, you added a new campground!");
			res.redirect("/campgrounds");
		}
	});
});

// new campground form page NEW ROUTE
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// SHOW ROUTE - display info on single campgrounds
router.get("/:id", (req, res)=>{
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
})

// EDIT 'GET' ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findById(req.params.id, (err, foundCampground)=>{
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE 'PUT' ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
		if(err){
			console.log(err);
		} else {
			req.flash("success", "Succesfully updated Campground!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// 'DELETE' ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndRemove(req.params.id, (err)=>{
		if(err) {
			console.log(err);
		} else {
			req.flash("success", "You deleted it!");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;