const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon'); // eslint-disable-line no-unused-vars
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/user/check-email';

const TEST_EMAIL_TAKEN = { email: 'admin@test.com' };
const TEST_EMAIL_NOT_TAKEN = { email: 'random@email.com' };

describe('controller.users.checkEmail', () => {
  after(async () => {
    app.server.close();
  });
  it('Should return true if email is taken', async () => {
    const res = await chai.request(app)
      .get(endpoint)
      .query(TEST_EMAIL_TAKEN);
    expect(res).to.have.status(200);
    expect(res.body.taken).to.be.true;
  });
  it('Should return false if email is not taken', async () => {
    const res = await chai.request(app)
      .get(endpoint)
      .query(TEST_EMAIL_NOT_TAKEN);
    expect(res).to.have.status(200);
    expect(res.body.taken).to.be.false;
  });
});
