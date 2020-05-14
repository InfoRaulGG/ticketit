const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const initialData = [{
        "id": 1,
        "title": "test",
        "description": "text",
        "level": "high",
        "isActive": "true",
        "teamMembers": [
            "Developer"
        ]
    },
    {
        "id": 2,
        "title": "test",
        "description": "text",
        "level": "high",
        "isActive": "true",
        "teamMembers": [
            "Developer"
        ]
    },
    {
        "id": 3,
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
});
/*
beforeEach((done) => {

    mongoose.connection.collection("tickets").drop(() => {
        done();
    });

    mongoose.connection.collection("tickets").remove();

    mongoose.connection.collection("tickets").insertMany(initialData);

});
*/