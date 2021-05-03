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
const newUserDetails = {
  firstName: Math.random().toString(),
  lastName: Math.random().toString(),
  email: Math.random().toString(),
  phone: Math.random().toString(),
};

describe('logic.user.updateUserById', () => {
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
  it('Should update User object given valid id', async () => {
    const updateUserSpy = sinon.spy(User, 'update');
    const data = await userLogic.updateUserById(testUser.id, newUserDetails);
    expect(updateUserSpy).to.have.been.calledWith(newUserDetails, { where: { id: testUser.id } });
    expect(data).to.deep.equal([1]);
  });
  it('Should return null given invalid id', async () => {
    const updateUserSpy = sinon.spy(User, 'update');
    const { id: fakeUserId } = generateTestUserData({ groupdId: TEST_GROUP.id });
    const data = await userLogic.updateUserById(fakeUserId, newUserDetails);
    expect(updateUserSpy).to.have.been.calledWith(newUserDetails, { where: { id: fakeUserId } });
    expect(data).to.deep.equal([0]);
  });
});
