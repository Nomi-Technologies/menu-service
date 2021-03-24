const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const userLogic = require('../../../src/logic/users');
const { User } = require('../../../src/models');
const { generateTestUserData, deleteTestUserById, createTestUser } = require('../../utils/users');
const { generateTestRestaurantData, createTestRestaurant, deleteTestRestaurantById } = require('../../utils/restaurants');

chai.use(sinonChai);
const { expect } = chai;

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
const newUserDetails = {
  firstName: Math.random().toString(),
  lastName: Math.random().toString(),
  email: Math.random().toString(),
  phone: Math.random().toString(),
};

describe('logic.user.updateUserById', () => {
  before(async () => {
    await createTestRestaurant(TEST_RESTAURANT);
    await createTestUser(TEST_USER);
  });
  after(async () => {
    await Promise.all([
      deleteTestUserById(TEST_USER.id),
      deleteTestRestaurantById(TEST_RESTAURANT.id),
    ]);
  });
  afterEach(async () => {
    sinon.restore();
  });
  it('Should update User object given valid id', async () => {
    const updateUserSpy = sinon.spy(User, 'update');
    const data = await userLogic.updateUserById(TEST_USER.id, newUserDetails);
    expect(updateUserSpy).to.have.been.calledWith(newUserDetails, { where: { id: TEST_USER.id } });
    expect(data).to.deep.equal([1]);
  });
  it('Should return null given invalid id', async () => {
    const updateUserSpy = sinon.spy(User, 'update');
    const { id: fakeUserId } = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
    const data = await userLogic.updateUserById(fakeUserId, newUserDetails);
    expect(updateUserSpy).to.have.been.calledWith(newUserDetails, { where: { id: fakeUserId } });
    expect(data).to.deep.equal([0]);
  });
});
