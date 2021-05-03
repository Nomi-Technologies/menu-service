const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const userLogic = require('../../../src/logic/users');
const { User } = require('../../../src/models');
const { generateTestUserData, deleteTestUserById, createTestUser } = require('../../utils/users');
const { generateTestGroupData, createTestGroup, deleteTestGroupById } = require('../../utils/groups');

chai.use(sinonChai);
const { expect } = chai;

const TEST_GROUP = generateTestGroupData();
const TEST_USER_DATA = generateTestUserData({ groupId: TEST_GROUP.id });
let testUser;
const NONEXISTENT_USER_ID = '00000000-0000-0000-0000-000000000000';

describe('logic.user.getUserById', () => {
  before(async () => {
    await createTestGroup(TEST_GROUP);
    testUser = await createTestUser(TEST_USER_DATA);
  });
  after(async () => {
    await Promise.all([
      deleteTestUserById(testUser.id),
      deleteTestGroupById(TEST_GROUP.id),
    ]);
  });
  afterEach(async () => {
    sinon.restore();
  });
  it('Should return User object given valid id', async () => {
    const getUserSpy = sinon.spy(User, 'getUser');
    const data = await userLogic.getUserById(testUser.id);
    expect(getUserSpy).to.have.been.calledWith({ id: testUser.id });
    expect(data).to.be.an('object');
    expect(data).to.have.property('email');
  });
  it('Should return null given invalid id', async () => {
    const data = await userLogic.getUserById(NONEXISTENT_USER_ID);
    expect(data).to.be.null;
  });
});
