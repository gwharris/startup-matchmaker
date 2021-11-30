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
app.use(express.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "keyboard cat",
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

passport.use(["local-user"], new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(["local-startup"], new LocalStrategy(Startup.authenticate()));
passport.serializeUser(Startup.serializeUser());
passport.deserializeUser(Startup.deserializeUser());

// ALL CLEAR WITH TESTING
// registers startups
app.post("/api/registerStartup", function (req, res) {
    let name = req.body.startup_name
    let email = req.body.startup_email;
    let password = req.body.startup_password;
    Startup.register(new Startup({ name: name, username: email }),
        password, function (err, startup) {
            if (err) {
                console.log(err);
                // res.send({
                //     retStatus: 'Failure',
                //     redirectTo: './../startupregister',
                // });
            }
            passport.authenticate("local-startup"),
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
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    User.register(new User({ name: name, username: email }),
        password, function (err, user) {
            if (err) {
                console.log(err);
                // return res.render("register");
            }
            passport.authenticate("local-user"),
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
app.post("/api/loginStartup",
    passport.authenticate('local-startup', { 
        failureRedirect: './../startuplogin', 
        failureFlash: 'Invalid username or password.' 
    }),
    function (req, res) {
        console.log('request!!!');
        res.send({
            // currently broken because matches does not exist but
            // should be resolved soon
            // VERY TEMP: rerouting to startup profile to test
            redirectTo: './../startupprofile',
        });
    });

// ALL CLEAR WITH TESTING
//Handling user login
//currently this works if the user can be authorized but not otherwise
app.post("/api/loginUser",
    passport.authenticate('local-user', { 
        failureRedirect: './../personlogin', 
        failureFlash: 'Invalid username or password.' 
    }),
    function (req, res) {
        console.log('request!!!');
        res.send({
            // currently broken because matches does not exist but
            // should be resolved soon
            redirectTo: './../matches',
        });
    });

// not currently needed depending on how the frontend is set up
// // testing still needed
// //  get a user's profile information
// app.get("/api/getUserProfile", function (req, res) {
//     var myquery = { _id: ObjectId(req.user._id) };
//     User.findOne(myquery, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//     });
// });

// // testing still needed
// //  get a startup's profile information
// app.get("/api/getStartupProfile", function (req, res) {
//     var myquery = { _id: ObjectId(req.user._id) }; //might need to change user here? test
//     Startup.findOne(myquery, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//     });
// });

// ALL CLEAR WITH TESTING
// one remaining issue for backlog: make skills separable into elems in array
// edit a user's profile
app.post("/api/editPersonProfile", function (req, res) {
    console.log(req);
    var myquery = { _id: ObjectId(req.user._id) };
    User.updateOne(myquery,
        {
            bio: req.body.person_bio,
            skills: req.body.person_skills,
            experience: req.body.person_experience
        },
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// testing still needed
// edit a startup's profile
app.post("/api/editStartupProfile", function (req, res) {
    console.log("pls update startup profile");
    console.log(req);
    var myquery = { _id: ObjectId(req.user._id) }; //do we need to edit user here same as the getter
    Startup.updateOne(myquery,
        {
            bio: req.body.startup_bio,
            skills: req.body.startup_skills,
        },
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// get a user's matches and send to frontend


// get a startup's matches and send to frontend

// logic: 
// 1. take a startup's ID and get its desired skills
// 2. find a way to search for all users with each of those skills
// 3. return above users

// WIP status
// app.get("/api/getStartupMatches", function (req, res) {
//     var myquery = { _id: ObjectId(req.user._id) }; //might need to change user here? test
//     Startup.findOne(myquery, 'skills', function (err, result) { //'skills' asks it to only return skills
//         if (err) throw err;
//         // res.json(result);
//         console.log(result);
//     });
// });

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
