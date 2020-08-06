const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');


const { expect } = chai;
chai.use(chaiHttp);

describe("Api route test", () => {
  it("returns an object with data from the typed url", done => {
    chai
      .request(app)
      .get("/api/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Welcome To Testing API");
        done();
      });
  });