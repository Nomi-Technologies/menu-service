const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon'); // eslint-disable-line no-unused-vars
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { authenticateTestUser } = require('../../utils/users');
const { generateTestRestaurantData, deleteTestRestaurantById, createTestRestaurant } = require('../../utils/restaurants');
const { generateTestUserData, deleteTestUserById, createTestUser } = require('../../utils/users');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/restaurants/me';

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
let token;

describe('controller.users.getRestaurant', () => {
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
  context('Authenticated Requests', () => {
    before(async () => {
      token = await authenticateTestUser(TEST_USER);
      expect(token).to.not.be.null;
    });
    it('Should return restaurant if user is logged in', async () => {
      const res = await chai.request(app)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.deep.include({
        city: TEST_RESTAURANT.city,
        name: TEST_RESTAURANT.name,
        phone: TEST_RESTAURANT.phone,
        state: TEST_RESTAURANT.state,
        streetAddress: TEST_RESTAURANT.streetAddress,
        url: TEST_RESTAURANT.url,
        zip: TEST_RESTAURANT.zip,
      });
    });
  });
  context('Unauthenticated Requests', () => {
    before(async () => {
      token = null;
    });
    it('Should return error if user is not logged in', async () => {
      const res = await chai.request(app)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(401);
    });
  });
});
