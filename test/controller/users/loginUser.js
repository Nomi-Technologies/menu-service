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

const endpoint = '/api/user/login';

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });

describe('controller.users.loginUser', () => {
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
  it('Should return user token', async () => {
    const res = await chai.request(app)
      .post(endpoint)
      .send(TEST_USER);
    expect(res).to.have.status(200);
    expect(res.body.token).to.be.a('string');
  });
});
