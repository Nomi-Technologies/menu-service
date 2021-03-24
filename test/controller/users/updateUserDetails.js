const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon'); // eslint-disable-line no-unused-vars
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const {
  authenticateTestUser, generateTestUserData, deleteTestUserById, createTestUser,
} = require('../../utils/users');
const { generateTestRestaurantData, createTestRestaurant, deleteTestRestaurantById } = require('../../utils/restaurants');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/user/details';

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
let token;

describe('controller.user.updateUserDetails', () => {
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
    beforeEach(async () => {
      token = await authenticateTestUser(TEST_USER);
      expect(token).to.not.be.null;
    });
    it('Should update user details if user is logged in', async () => {
      const newUserDetails = {
        firstName: Math.random().toString(),
        lastName: Math.random().toString(),
        email: Math.random().toString(),
        phone: Math.random().toString(),
      };
      const res = await chai.request(app)
        .put(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send(newUserDetails);
      expect(res).to.have.status(200);
      const { user } = res.body;
      expect(user.firstName).to.equal(newUserDetails.firstName);
      expect(user.lastName).to.equal(newUserDetails.lastName);
      expect(user.email).to.equal(newUserDetails.email);
      expect(user.phone).to.equal(newUserDetails.phone);
    });
  });
  context('Unauthenticated Requests', () => {
    before(async () => {
      token = null;
    });
    it('Should return error if user is not logged in', async () => {
      const res = await chai.request(app)
        .put(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ });
      expect(res).to.have.status(401);
    });
  });
});
