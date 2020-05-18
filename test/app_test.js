const assert = require("assert");
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const fs = require("fs");

const url = "http://localhost:4299";


chai.should();
chai.use(chaiHttp);

var testId;
var testIdNotDelete;

describe("Handles test requests", () => {

    /*
        Test the get all route
    */

    describe("GET /api/ticket", () => {

        it("It should GET collection", (done) => {
            chai.request(url)
                .get("/api/ticket")
                .end((err, response) => {
                    response.should.have.status(200);

                    testIdNotDelete = response.body.tickets[0]._id;
                    response.body.should.be.a("object");
                    response.body.tickets.should.be.a("array");
                    response.body.tickets.length.should.be.eq(3);
                    done();
                });
        });


        it("It should GET collection", (done) => {
            chai.request(url)
                .get("/api/ticke")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });


    /*
        Test the get by id route       
    */
    describe("GET /api/ticket/:id", () => {

        it("It should GET a ticket by id", (done) => {
            chai.request(url)
                .get("/api/ticket/" + testIdNotDelete)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.Ticket.should.have.property("id_prueba");
                    response.body.Ticket.should.have.property("title");
                    response.body.Ticket.should.have.property("description");
                    response.body.Ticket.should.have.property("level");
                    response.body.Ticket.should.have.property("isActive");
                    response.body.Ticket.should.have.property("teamMembers");
                    response.body.Ticket.should.have.property("id_prueba").eq(1);
                    done();
                });
        });


        it("It should NOT GET a ticket by non existing id", (done) => {
            chai.request(url)
                .get("/api/ticket" + 12)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });


    /*
        Test the post ticket route
    */
    describe("POST /api/ticket", () => {
        it("It should create a new ticket", (done) => {

            chai.request(url)
                .post("/api/ticket")
                .send({
                    "title": "Fallo en las pruebas automaticas",
                    "description": "Jenkins dijo que no pasaste las pruebas",
                    "level": "high",
                    "isActive": "true",
                    "teamMembers": [
                        "Developer"
                    ]
                })
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a("object");
                    testId = response.body.Ticket._id;
                    response.body.Ticket.should.have.property("title");
                    response.body.Ticket.should.have.property("description");
                    response.body.Ticket.should.have.property("level");
                    response.body.Ticket.should.have.property("isActive");
                    response.body.Ticket.should.have.property("teamMembers");
                    done();
                });
        });

        it("It should NOT POST new ticket", (done) => {
            chai.request(url)
                .post("/api/ticket")
                .send({
                    "title": "Fallo en las pruebas automaticas",
                    "description": "Jenkins dijo que no pasaste las pruebas",
                    "isActive": "true",
                    "teamMembers": [
                        "Developer"
                    ]
                })
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("name").eq("ValidationError");
                    response.body.should.have.property("friendly").eq("ticket validation failed");
                    done();
                });
        });
    });

    /*
        Test the delete route
    */

    describe("DELETE /api/ticket", () => {
        it("It should delete a existing ticket", (done) => {
            chai.request(url)
                .delete("/api/ticket/" + testId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("Message").eq("Deleted item");
                    response.body.should.have.property("Ticket").should.be.a("object");
                    response.body.Ticket.should.have.property("_id").eq(testId);
                    done();
                });
        });

        it("It should NOT DELETE a existing ticket", (done) => {
            chai.request(url)
                .post("/api/delete/" + 123)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    /*
        Test the put route
    */

    describe("PUT /api/ticket:id", () => {
        it("It should update a existing ticket by id", (done) => {
            chai.request(url)
                .put("/api/ticket/" + testIdNotDelete)
                .send({
                    "title": "PUT",
                    "description": "PUT",
                    "level": "LOW",
                    "isActive": "false",
                    "teamMembers": [
                        "developer"
                    ]
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("Message").eq("Ticket updated sucesfully");
                    response.body.Ticket.should.have.property("title").eq("PUT");
                    response.body.Ticket.should.have.property("description").eq("PUT");
                    response.body.Ticket.should.have.property("level").eq("LOW");
                    response.body.Ticket.should.have.property("isActive").eq("false");
                    done();
                });
        });

        it("It NOT SHOULD update a existing ticket by id", (done) => {
            chai.request(url)
                .put("/api/ticket/" + 1)
                .send({
                    "description": "PUT",
                    "level": "LOW",
                    "teamMembers": [
                        "developer"
                    ]
                })
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property("name").eq("CastError");
                    done();
                });
        });
    });


    /*
        Test the upload route
    */
    describe("POST /api/ticket/:id", () => {
        it("It should upload a file and associate with ticket", (done) => {

            chai.request(url)
                .post("/api/ticket/" + testIdNotDelete)
                .attach("file", fs.readFileSync("test/test.txt"), "file.txt")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");

                    response.body.should.have.property("Message").eq("Upload succesfull");
                    response.body.should.have.property("files");
                    done();
                });
        });

        it("It should NOT UPLOAD a file and associate with ticket cause a invalid extension", (done) => {

            chai.request(url)
                .post("/api/ticket/" + testIdNotDelete)
                .attach("file", fs.readFileSync("test/test.gif"), "file.gif")
                .end((err, response) => {
                    response.should.have.status(301);
                    done();
                });
        });


        it("It should NOT UPLOAD new file from a ticket", (done) => {
            chai.request(url)
                .post("/api/ticket/" + 1)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    });


});