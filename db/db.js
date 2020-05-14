require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.DEV_DB;

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log("Connected to mongo :: Yuju Yaja ");
    },
    error => {
        console.log("Errors ocurreds");
        console.log(error.stack);
    }
);

module.exports = mongoose;