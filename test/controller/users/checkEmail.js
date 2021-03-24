const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon'); // eslint-disable-line no-unused-vars
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { generateTestRestaurantData, deleteTestRestaurantById, createTestRestaurant } = require('../../utils/restaurants');
const { generateTestUserData, deleteTestUserById, createTestUser } = require('../../utils/users');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/user/check-email';

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
const TEST_EMAIL_NOT_TAKEN = { email: Math.random().toString() };

describe('controller.users.checkEmail', () => {
  before(async () => {
    await createTestRestaurant(TEST_RESTAURANT);
    await createTestUser(TEST_USER);
  });
  after(async () => {
    await Promise.all([
      deleteTestUserById(TEST_USER.id),
      deleteTestRestaurantById(TEST_RESTAURANT.id),
    ]);
    app.server.close();
  });
  it('Should return true if email is taken', async () => {
    const res = await chai.request(app)
      .get(endpoint)
      .query(TEST_USER);
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
