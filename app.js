var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    cors = require('cors'),
    path = require('path'),
    dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, () =>{console.log("database connected!")});

var app = express();
app.use(express.json());

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// function I use just to check if the backend is working
// app.get("/", function(req, res) {
//     res.send("hello world");
// });

// since we don't need to render anything from the backend these should be gone fairly soon

// app.get("/api/index", function (req, res) {
//     res.render("index");
// });

// Showing home page
// app.get("/api/homepage", isLoggedIn, function (req, res) {
//     res.render("homepage");
// });

// Showing register form
// app.get("/api/register", function (req, res) {
//     res.render("register");
// });

// Handling user signup
app.post("/api/register", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({ username: username }),
        password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            }

            passport.authenticate("local")(
                req, res, function () {
                    console.log('register request!!!');
                    retStatus = 'Success';
                    res.send({
                        retStatus: retStatus,
                        redirectTo: './../matches',
                    });
                });
        });
});

// deprecated because react handles rendering

// Showing login form
// app.get("/api/login", function (req, res) {
//     res.render("login");
// });

//Handling user login
//currently this works if the user can be authorized but not otherwise
// remember to handle failure redirect
app.post("/api/login",
    passport.authenticate('local'),
    function (req, res) {
        console.log('request!!!');
        res.send({
            redirectTo: './../matches',
        });
    });

//Handling user logout
// app.get("/api/logout", function (req, res) {
//     req.logout();
//     res.redirect("/api/index");
// });

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/api/login");
// }

var port = process.env.PORT || 8080;

app.use('/', express.static(path.resolve(__dirname, "./frontend/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

app.listen(port, function () {
    console.log("Server Has Started!");
});