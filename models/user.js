//USER = PERSON for now
const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bio: {
        type: String,
        default: ""
    },
    skills: [{
        type: String,
        default: ""
    }],
    experience: [{
        type: String,
        default: ""
    }], 
});

module.exports = mongoose.model("User", user);

/*
var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var UserSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        default: ""
    },
    Password: String,
    date:{
        type:Date,
        default:Date.now
    },
    bio: {
        type: String,
        default: ""
    },
    skills: [{
        type: String,
        default: ""
    }],
    experience: [{
        type: String,
        default: ""
    }]
});

UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema);
*/