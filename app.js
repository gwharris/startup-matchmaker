// current TODO
// figure out what is causing the issue with startup profile update

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
const connection = mongoose.connection;

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
    const name = req.body.startup_name
    const email = req.body.startup_email;
    const password = req.body.startup_password;
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
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
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
            redirectTo: './../personprofile',
        });
    });

// not currently needed depending on how the frontend is set up
// // testing still needed
// //  get a user's profile information
app.get("/api/getUserProfile", function (req, res) {
    var myquery = { _id: ObjectId(req.user._id) };
    User.findOne(myquery, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

// // testing still needed
// //  get a startup's profile information
app.get("/api/getStartupProfile", function (req, res) {
    var myquery = { _id: ObjectId(req.user._id) }; //might need to change user here? test
    Startup.findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// ALL CLEAR WITH TESTING
// edit a user's profile
app.post("/api/editPersonProfile", function (req, res) {
    // console.log(req);
    const myquery = { _id: ObjectId(req.user._id) };
    const personSkills = req.body.skills.map(function (item) {
        return item['label'];
    });
    User.updateOne(myquery,
        {
            name: req.body.name,
            organization: req.body.organization,
            title: req.body.title,
            bio: req.body.bio,
            contact: req.body.contact,
            skills: personSkills
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
    const myquery = { _id: ObjectId(req.user._id) }; //do we need to edit user here same as the getter
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

// currently never returns anything even when search is exact
// more testing/refinement needed
// search for user-side (returns startup profiles as result)
app.post("/api/searchUsers", function (req, res) {
    console.log(req.body);
    Startup
        .find(
            { $text: { $search: req.body.term } },
            // { score: { $meta: "textScore" } }
        )
        // .sort({ score: { $meta: 'textScore' } })
        .exec(function (err, result) {
            // callback
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
})

// currently never returns anything even when search is exact
// more testing/refinement needed
// search for startup-side (returns user profiles as a result)
app.post("/api/searchStartups", function (req, res) {
    User
        .find(
            { $text: { $search: req.body.term } },
            { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: 'textScore' } })
        .exec(function (err, result) {
            // callback
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
})

// gets user skills
function getUserSkills(userQuery) {
    return new Promise(resolve => {
        User.findOne(userQuery, 'skills', { '_id': false }, function (err, result) {
            if (err) throw err;
            resolve(result.skills);
        })
    });
}

//  gets all startups looking for a particular skill
function getStartups(skill) {
    return new Promise(resolve => {
        Startup.find({
            skills: skill
        }, function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}

// ALL CLEAR WITH TESTING
// get a user's matches and send to frontend
app.get("/api/getPersonMatches", async function (req, res) {
    // initialize queries
    const userQuery = { _id: ObjectId(req.user._id) };
    // get the skills listed by the user
    let userSkills = await getUserSkills(userQuery);
    let allStartups = [];
    // search for startups with those skills listed
    for (let i = 0; i < userSkills.length; i++) {
        allStartups = allStartups.concat(await getStartups(userSkills[i]));
        console.log(allStartups);
    }
    res.json(allStartups);
});

// get list of skills desired by startup
function getStartupSkills(userQuery) {
    return new Promise(resolve => {
        Startup.findOne(userQuery, 'skills', { '_id': false }, function (err, result) {
            if (err) throw err;
            resolve(result.skills);
        })
    });
}


//  gets all users with for a particular skill
function getUsers(skill) {
    return new Promise(resolve => {
        User.find({
            skills: skill
        }, function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}

// test when user/startup data has been populated
// get a startup's matches and send to frontend
app.get("/api/getStartupMatches", async function (req, res) {
    // initialize queries
    //still not really sure about the user v startup thing here, double check
    const userQuery = { _id: ObjectId(req.user._id) }; 
    // get the skills listed by the startup
    let startupSkills = await getStartupSkills(userQuery);
    let allUsers = [];
    // search for startups with those skills listed
    for (let i = 0; i < startupSkills.length; i++) {
        allUsers = allUsers.concat(await getUsers(startupSkills[i]));
        console.log(allUsers);
    }
    res.json(allUsers);
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
