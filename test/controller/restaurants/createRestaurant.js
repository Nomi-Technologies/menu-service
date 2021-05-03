const chai = require('chai');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { generateTestRestaurantData, deleteTestRestaurantById } = require('../../utils/restaurants');
const {
  authenticateTestUser, createTestUser, generateTestUserData, deleteTestUserById,
} = require('../../utils/users');
const { createTestGroup, generateTestGroupData } = require('../../utils/groups.js');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/restaurants';

const TEST_USER = generateTestUserData();
let token; let testRestaurantId; let
  testGroup;

describe('controller.restauarants.createRestaurant', () => {
  before(async () => {
    testGroup = await createTestGroup(generateTestGroupData);

    await createTestUser(TEST_USER);
  });
  after(async () => {
    await Promise.all([
      deleteTestUserById(TEST_USER.id),
    ]);
    app.server.close();
  });
  context('Authenticated Requests', () => {
    before(async () => {
      token = await authenticateTestUser(TEST_USER);
      expect(token).to.not.be.null;
    });
    after(async () => {
      deleteTestRestaurantById(testRestaurantId);
    });
    it('Should create restaurant', async () => {
      const TEST_RESTAURANT = generateTestRestaurantData({ groupId: testGroup.id });
      const res = await chai.request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send(TEST_RESTAURANT);
      expect(res).to.have.status(200);
      expect(res.body).to.deep.include({
        city: TEST_RESTAURANT.city,
        name: TEST_RESTAURANT.name,
        phone: TEST_RESTAURANT.phone,
        state: TEST_RESTAURANT.state,
        streetAddress: TEST_RESTAURANT.streetAddress,
        url: TEST_RESTAURANT.url,
        zip: TEST_RESTAURANT.zip,
        groupId: testGroup.id,
      });

      res.body.id;
      // set testRestaurant to the id created by `createRestuarant` so that we can delete it in
      // the `after` clause
    });
  });
});
