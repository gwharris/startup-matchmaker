const mongoose = require('mongoose');

const startup = new mongoose.Schema ({
    startup_name: String,
    startup_email: String,
    startup_password: String,

});

module.exports= mongoose.model("Startup", startup);