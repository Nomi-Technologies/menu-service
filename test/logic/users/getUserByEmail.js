const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const userLogic = require('../../../src/logic/users');
const { User } = require('../../../src/models');
const { generateTestRestaurantData, deleteTestRestaurantById, createTestRestaurant } = require('../../utils/restaurants');
const { generateTestUserData, deleteTestUserById, createTestUser } = require('../../utils/users');

chai.use(sinonChai);
const { expect } = chai;

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
const TEST_EMAIL_NOT_TAKEN = Math.random().toString();

describe('logic.user.getUserByEmail', () => {
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
  it('Should return User object given valid email', async () => {
    const getUserSpy = sinon.spy(User, 'getUser');
    const data = await userLogic.getUserByEmail(TEST_USER.email);
    expect(getUserSpy).to.have.been.calledWith({ email: TEST_USER.email });
    expect(data).to.be.an('object');
    expect(data).to.have.property('email');
  });
  it('Should return null given invalid email', async () => {
    const data = await userLogic.getUserByEmail(TEST_EMAIL_NOT_TAKEN);
    expect(data).to.be.null;
  });
});
