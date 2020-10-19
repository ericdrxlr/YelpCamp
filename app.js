// 1st step - set up modules
const express 		= require('express'), // = framework to simplify creating web apps with node.js
	  app 			= express(),
	  mongoose 		= require('mongoose'), // = object data mapper(odm), i.e. allows us to write js and send info to db
	  flash			= require('connect-flash'),
	  bodyParser 	= require('body-parser'), // returns html as json
	  passport		= require('passport'),
	  LocalStrategy = require('passport-local'),
	  methodOverride = require('method-override'),

	  // models
	  Campground    = require('./models/campground'),
	  Comment		= require('./models/comment'),
	  User 			= require('./models/user'),
	  //routes
	  commentRoutes = require('./routes/comments'),
	  indexRoutes    = require('./routes/index'),
	  campgroundRoutes = require('./routes/campgrounds'),
	  seedDB 		= require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", { // == to 'USE' in mongo (i.e. creates or finds database)
	useNewUrlParser: true,
	useUnifiedTopology: true }) // no semicolon here
.then(() => console.log("Connected to DB!")) // no semicolon here
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //3rd step - interpret ejs files language
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: "It's me eric",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// 4rd step - set up landing page
app.get("/", (req, res) => {
	res.render("landing");
});

//2nd step - set up server
app.listen(3000, () => {
	console.log("YelpCamp server is running");
});