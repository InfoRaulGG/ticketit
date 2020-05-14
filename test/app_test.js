const assert = require("assert");
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");


chai.should();
chai.use(chaiHttp);

describe("Handles test requests", () => {

    /*
        Test the get all route
    */
    describe("GET /api/ticket", () => {

        it("It should GET collection", app => {
            chai.request(app)
                .get("/api/ticket")
                .end((err, response) => {
                    console.log(err);
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.length.should.be.eq(3);
                    done();
                });
        });

        it("It should GET collection", app => {
            chai.request(app)
                .get("/api/ticke")
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    });


    /*
        Test the get by id route       
    */
    describe("GET /api/ticket/:id", () => {

        it("It should GET a ticket by id", app => {
            const id = 1;
            chai.request(app)
                .get("/api/ticket/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("id");
                    response.body.should.have.property("title");
                    response.body.should.have.property("description");
                    response.body.should.have.property("level");
                    response.body.should.have.property("isActive");
                    response.body.should.have.property("teamMembers");
                    response.body.should.have.property("id").eq(1);
                    done();
                });
        });
    })

    /*
        Test the post ticket route
    */

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