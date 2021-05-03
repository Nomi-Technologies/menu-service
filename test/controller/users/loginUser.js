const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon'); // eslint-disable-line no-unused-vars
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { generateTestGroupData, createTestGroup, deleteTestGroupById } = require('../../utils/groups.js');
const { generateTestUserData, deleteTestUserById, createTestUser } = require('../../utils/users');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/users/login';

const TEST_GROUP = generateTestGroupData();
const TEST_USER_DATA = generateTestUserData({ groupId: TEST_GROUP.id, password: 'testPass' });
let testUser;

describe('controller.users.loginUser', () => {
  beforeEach(async () => {
    await createTestGroup(TEST_GROUP);
    testUser = await createTestUser(TEST_USER_DATA);
  });
  afterEach(async () => {
    await Promise.all([
      deleteTestUserById(testUser.id),
      deleteTestGroupById(TEST_GROUP.id),
    ]);
    app.server.close();
  });

  it('Should return user token', async () => {
    const res = await chai.request(app)
      .post(endpoint)
      .send({ email: testUser.email, password: 'testPass' });
    expect(res).to.have.status(200);
    expect(res.body.token).to.be.a('string');
  });
});
