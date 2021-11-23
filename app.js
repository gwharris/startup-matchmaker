const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Startup = require("./models/startup"),
    cors = require('cors'),
    path = require('path'),
    dotenv = require("dotenv"),
    ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, () => { console.log("database connected!") });

const app = express();
app.use(express.json());

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
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

passport.use(new LocalStrategy(Startup.authenticate()));
passport.serializeUser(Startup.serializeUser());
passport.deserializeUser(Startup.deserializeUser());

// function I use just to check if the backend is working
// app.get("/", function(req, res) {
//     res.send("hello world");
// });

// ALL CLEAR WITH TESTING
// registers startups
app.post("/api/registerStartup", function (req, res) {
    let username = req.body.startup_email;
    let password = req.body.startup_password;
    Startup.register(new Startup({ username: username }),
        password, function (err, startup) {
            if (err) {
                console.log(err);
                // res.send({
                //     retStatus: 'Failure',
                //     redirectTo: './../startupregister',
                // });
            }
            passport.authenticate("local"),
                function (req, res) {
                    console.log('register request!!!');
                    res.send({
                        redirectTo: './../startuplogin',
                    });
                };
        });
});

// ALL CLEAR WITH TESTING
// Handling user signup
app.post("/api/registerUser", function (req, res) {
    let username = req.body.email;
    let password = req.body.password;
    User.register(new User({ username: username }),
        password, function (err, user) {
            if (err) {
                console.log(err);
                // return res.render("register");
            }
            passport.authenticate("local"),
                function (req, res) {
                    console.log('register request!!!');
                    res.send({
                        redirectTo: './../personlogin',
                    });
                };
        });
});

// ALL CLEAR WITH TESTING
//Handling startup login
//currently this works if the startups can be authorized but not otherwise
app.post("/api/loginStartup",
        passport.authenticate('local', {failureRedirect: './../startuplogin'}),
        function (req, res) {
            console.log('request!!!');
            res.send({
                // currently broken because matches does not exist but
                // should be resolved soon
                redirectTo: './../matches',
            });
        });

// ALL CLEAR WITH TESTING
//Handling user login
//currently this works if the user can be authorized but not otherwise
app.post("/api/loginUser",
        passport.authenticate('local', {failureRedirect: './../personlogin'}),
        function (req, res) {
            console.log('request!!!');
            res.send({
                // currently broken because matches does not exist but
                // should be resolved soon
                redirectTo: './../matches',
            });
        });

//  get a user's profile information
app.get("/api/getProfile", function (req, res) {
    var myquery = { _id: ObjectId(req.user._id) };
    User.findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// edit a user's profile
app.post("/api/editProfile", function (req, res) {
    var myquery = { _id: ObjectId(req.user._id) };
    User.updateOne(myquery,
        {
            bio: req.body.bio,
            skills: req.body.skills,
            experience: req.body.experience
        },
        function (err, result) {
            if (err) throw err;
            res.json(result);
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
