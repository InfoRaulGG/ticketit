const assert = require("assert");
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

const url = "http://localhost:4299";


chai.should();
chai.use(chaiHttp);

var testId;

describe("Handles test requests", () => {

    /*
        Test the get all route
    */

    describe("GET /api/ticket", () => {

        it("It should GET collection", (done) => {
            chai.request(url)
                .get("/api/ticket")
                .end((err, response) => {
                    console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.tickets.should.be.a("array");
                    testId = response.body.tickets[0]._id ? response.body.tickets[0]._id : 0;
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
            const id = 1;
            chai.request(url)
                .get("/api/ticket/" + testId)
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
    });


    /*
        Test the post ticket route
    */
    describe("POST /api/ticket", () => {
        it("It should create a new ticket", (done) => {
            const id = 1;
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
                    response.body.Ticket.should.have.property("title");
                    testId = response.body.tickets[0]._id ? response.body.tickets[0]._id : 0;
                    response.body.Ticket.should.have.property("description");
                    response.body.Ticket.should.have.property("level");
                    response.body.Ticket.should.have.property("isActive");
                    response.body.Ticket.should.have.property("teamMembers");
                    done();
                });
        });
    });

    /*
        Test the delete route
    */

    /*
        Test the put route
    */

    /*
        Test the upload route
    */

});