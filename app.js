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
mongoose.connect(uri);

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

app.use(express.static(path.resolve(__dirname, '../frontend/src')));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/api/index", function (req, res) {
    res.render("index");
});

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
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }),
        password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            }

            passport.authenticate("local")(
                req, res, function () {
                    // res.render("/api/homepage");
                    console.log('request!!!');
                    retStatus = 'Success';
                    res.send({
                        retStatus: retStatus,
                        redirectTo: './../',
                    });
                });
        });
});

// Showing login form
app.get("/api/login", function (req, res) {
    res.render("login");
});

//Handling user login
app.post("/api/login",
    // passport.authenticate("local", {
    //     successRedirect: "/api/homepage",
    //     failureRedirect: "/api/register"
    // }),
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

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../startup-matchmaker/frontend/src', 'index.js'));
});

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/api/login");
// }

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server Has Started!");
});