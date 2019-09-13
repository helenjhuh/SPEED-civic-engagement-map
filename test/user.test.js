const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const { expect } = chai;
const faker = require("faker");
const { User } = require("../src/models");

const baseURL = "/api/user";

const browseRoute = `${baseURL}`;
const readRoute = `${baseURL}/:id`;
const editRoute = `${baseURL}/:id/edit`;
const addRoute = `${baseURL}/add`;
const deleteRoute = `${baseURL}/:id/destroy`;

const MakeReadRoute = id => `${baseURL}/${id}`;
const MakeEditRoute = id => `${baseURL}/${id}/edit`;
const MakeDeleteRoute = id => `${baseURL}/${id}/destroy`;

describe("User test", () => {
  /**
   * Before the bread tests, create a bunch of user data so that the tests
   * have something to work with.
   */
  before(done => {
    done();
  });

  it(`Should GET ${browseRoute} and return 200`, done => {
    chai
      .request(server)
      .get(browseRoute)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.eq("success");
        done();
      });
  });

  /**
   * After the tests have run, delete all of the data that was created
   * in the first step
   */
  after(done => {
    done();
  });
});
