var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var StartupSchema = mongoose.Schema({
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
    }]
});

StartupSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("Startup", StartupSchema);