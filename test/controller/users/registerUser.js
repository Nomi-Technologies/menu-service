const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon'); // eslint-disable-line no-unused-vars
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { generateTestUserData, deleteTestUserById } = require('../../utils/users');
const { createTestGroup, generateTestGroupData, deleteTestGroupById } = require('../../utils/groups.js');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/users/register';

const TEST_GROUP = generateTestGroupData();
const TEST_USER = generateTestUserData({ groupId: TEST_GROUP.id });

describe('controller.user.registerUser', () => {
  before(async () => {
    await createTestGroup(TEST_GROUP);
  });
  after(async () => {
    await Promise.all([
      deleteTestUserById(TEST_USER.id),
      deleteTestGroupById(TEST_GROUP.id),
    ]);
    app.server.close();
  });
  it('Should register user', async () => {
    const res = await chai.request(app)
      .post(endpoint)
      .send(TEST_USER);
    expect(res).to.have.status(200);
    expect(res.text).to.be.a('string');
  });
});
