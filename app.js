const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Routes files
const tickets = require("./routes/ticket");

// MIDDLEWARES SECTION
app.use("/api", tickets);

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


module.exports = app;