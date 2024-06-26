const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon'); // eslint-disable-line no-unused-vars
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { generateTestRestaurantData, createTestRestaurant, deleteTestRestaurantById } = require('../../utils/restaurants');
const {
  authenticateTestUser,
  generateTestUserData,
  deleteTestUserById,
  createTestUser,
  addFavoriteMenuByUserId,
} = require('../../utils/users');
const { generateTestMenuData, createTestMenu, deleteTestMenuById } = require('../../utils/menus');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

const endpoint = '/api/user/favorite-menus';

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_MENU = generateTestMenuData({ restaurantId: TEST_RESTAURANT.id });
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });
let token;

describe('controller.users.getFavoriteMenus', () => {
  before(async () => {
    await createTestRestaurant(TEST_RESTAURANT);
    await Promise.all([
      createTestMenu(TEST_MENU),
      createTestUser(TEST_USER),
    ]);
    await addFavoriteMenuByUserId(TEST_USER.id, TEST_MENU.id);
  });
  after(async () => {
    await Promise.all([
      deleteTestUserById(TEST_USER.id),
      deleteTestMenuById(TEST_MENU.id),
      deleteTestRestaurantById(TEST_RESTAURANT.id),
    ]);
    app.server.close();
  });
  context('Authenticated Requests', () => {
    beforeEach(async () => {
      token = await authenticateTestUser(TEST_USER);
      expect(token).to.not.be.null;
    });
    it('Should return user favorite menus if user is logged in', async () => {
      const res = await chai.request(app)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('FavoriteMenu');
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
