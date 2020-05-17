const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const initialData = [{
        "id_prueba": 1,
        "title": "test",
        "description": "text",
        "level": "high",
        "isActive": "true",
        "teamMembers": [
            "Developer"
        ]
    },
    {
        "id_prueba": 2,
        "title": "test",
        "description": "text",
        "level": "high",
        "isActive": "true",
        "teamMembers": [
            "Developer"
        ]
    },
    {
        "id_prueba": 3,
        "title": "test",
        "description": "text",
        "level": "high",
        "isActive": "false",
        "teamMembers": [
            "Developer"
        ]
    }
]


before(done => {

    mongoose.connect("mongodb://localhost/ticket_test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    mongoose.connection
        .once("open", () => {
            console.log("Connected to DB test");
            done();
        })
        .on("error", err => {
            console.warn("Warning", err);
        });


    mongoose.connection.dropDatabase("ticket_test");

    //mongoose.connection.dropCollection("tickets");

    mongoose.connection.collection("tickets").insertMany(initialData);

});