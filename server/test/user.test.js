const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const { expect } = chai;
const faker = require("faker");
const { User } = require("../src/models");

const baseURL = "/api/users";

const browseRoute = `${baseURL}`;
const readRoute = `${baseURL}/:id`;
const editRoute = `${baseURL}/:id/edit`;
const addRoute = `${baseURL}/add`;
const deleteRoute = `${baseURL}/:id/destroy`;

const makeReadRoute = id => `${baseURL}/${id}`;
const makeEditRoute = id => `${baseURL}/${id}/edit`;
const makeDeleteRoute = id => `${baseURL}/${id}/destroy`;

chai.use(chaiHttp);
chai.should();

// This is a placeholder for the generated users within the
// 'before' section of the User test
let users;

let validUser = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

let invalidUser = {
  email: faker.internet.email()
};

describe("User test", () => {
  /**
   * Before the bread tests, create a bunch of user data so that the tests
   * have something to work with.
   */
  before(done => {
    const promises = [];
    for (let i = 0; i < 50; i++) {
      let user = new User({
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
      promises.push(user.save());
    }
    Promise.all(promises).then(results => {
      users = results;
      done();
    });
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

  it(`should GET ${readRoute} and receive 200`, done => {
    chai
      .request(server)
      .get(makeReadRoute(users[0]._id))
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq("success");
        done();
      });
  });

  it(`should GET ${readRoute} and receive 400, because the id is not a valid ObjectId`, done => {
    chai
      .request(server)
      .get(makeReadRoute("ThisIdShouldNotexist"))
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.eq("fail");
        done();
      });
  });

  it(`should GET ${readRoute} and receive 200, because even though the id is a valid ObjectId, there is no data with that id`, done => {
    chai
      .request(server)
      .get(makeReadRoute("123456789098"))
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq("success");
        done();
      });
  });

  it(`should POST ${addRoute} and receive 200`, done => {
    chai
      .request(server)
      .post(addRoute)
      .send(validUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq("success");
        done();
      });
  });

  it(`should POST ${addRoute} and receive 400 because the request is missing required fields`, done => {
    chai
      .request(server)
      .post(addRoute)
      .send(invalidUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.eq("fail");
        done();
      });
  });

  it(`should DELETE ${deleteRoute}  and receive 400, because the id is not a valid ObjectId`, done => {
    chai
      .request(server)
      .delete(makeDeleteRoute("ThisIdShouldNotexist"))
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.eq("fail");
        done();
      });
  });

  it(`should DELETE ${deleteRoute} and receive 200, because even though the id is a valid ObjectId, there is no data with that id`, done => {
    chai
      .request(server)
      .delete(makeDeleteRoute("123456789098"))
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq("success");
        done();
      });
  });

  it(`should DELETE ${deleteRoute} and receive 200`, done => {
    chai
      .request(server)
      .delete(makeDeleteRoute(users[15]._id))
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq("success");
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
