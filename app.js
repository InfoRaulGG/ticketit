const express = require("express");
const bodyParser = require("body-parser");
const app = express();



// MIDDLEWARES SECTION
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Routes files
const tickets = require("./routes/ticket");
app.use("/api", tickets);

// error middleware
app.use((err, req, res, next) => {
    res.status(400).send({
        error: err.message,
        name: err.name,
        friendly: err._message
    });
});


module.exports = app;