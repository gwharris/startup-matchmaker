var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var UserSchema = mongoose.Schema({
    name: String,
    username: {
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
