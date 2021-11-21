const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const dotenv = require('dotenv')
const User = require('./models/user')
const Startup = require('./models/startup');
const { MongoBatchReExecutionError } = require('mongodb');

const app = express();

dotenv.config();
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=> {
    console.log("database connected yuh")
});

//Middleware
app.use(cors ({
    origin: 'http://localhost:3000', // react app...local for now deploy to heroku later?
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require('./startupPassportConfig')(passport);

//routes
/*
Note: AS OF NOW, both registrations of person and startup are working 100% fine, but the registration is a bit weird, and the tutorial i followed didn't really help
*/
app.post("/personlogin", (req, res) =>{
    console.log(req.body);
});

//method of passport, uses the passport config file but idk how that works with two separate logins
app.post("/startuplogin", (req, res, next) =>{
    passport.authenticate("local", (err, startup, info) => {
        if (err) throw err;
        if (!startup) res.send("no such startup exists");
        else {
            req.logIn(startup, err =>{
                if (err) throw err;
                res.send("successfully authenticated");
                console.log(req.startup);
            })
        }
    })(req, res, next);
});

app.post("/personregister", (req, res) =>{
    User.findOne({email: req.body.email}, async (err, doc) =>{
        if (err) throw err;
        if (doc) res.send("Person already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User/(person) Created!");
        }
    });
});

// handle registration 
app.post("/startupregister", (req, res) =>{
    Startup.findOne({startup_email: req.body.startup_email}, async (err, doc) =>{
        if (err) throw err;
        if (doc) res.send("Startup already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.startup_password, 10)
            const newStartup = new Startup({
                startup_name: req.body.startup_name,
                startup_email: req.body.startup_email,
                startup_password: hashedPassword,
            });
            await newStartup.save();
            res.send("Startup Created!");
        }
    }); 
});

//would have eventually held authenticated user data to use as you please...
app.get("/person", (req, res) => {});
app.get("/startup", (req, res) => {});

//start server
app.listen(4000, () =>{
    console.log('Server started yuh');
})

//all the old code is here! 
/*
const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    cors = require('cors'),
    path = require('path'),
    dotenv = require("dotenv"),
    ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, () =>{console.log("database connected!")});

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

// Handling user signup
app.post("/api/register", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username }),
        password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("local")(
                function (req, res) {
                    console.log('register request!!!');
                    retStatus = 'Success';
                    res.send({
                        retStatus: retStatus,
                        redirectTo: './../personlogin',
                    });
                });
        });
});

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
*/