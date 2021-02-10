const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const {
  authenticateTestUser, generateTestUserData, deleteTestUserById, createTestUser,
} = require('../../utils/users');
const { generateTestRestaurantData, createTestRestaurant, deleteTestRestaurantById } = require('../../utils/restaurants');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/user/password';

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
let token;

describe('controller.user.updatePassword', () => {
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
    it('Should update user password if user is logged in', async () => {
      const oldPass = TEST_USER.password;
      const newPass = Math.random().toString();
      const res = await chai.request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ password: oldPass, newPassword: newPass });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('password updated successfully');
    });
  });
  context('Unauthenticated Requests', () => {
    before(async () => {
      token = null;
    });
    it('Should return error if user is not logged in', async () => {
      const oldPass = TEST_USER.password;
      const newPass = Math.random().toString();
      const res = await chai.request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ password: oldPass, newPassword: newPass });
      expect(res).to.have.status(401);
    });
  });
});
