const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { generateTestUserData, deleteTestUserById } = require('../../utils/users');
const { generateTestRestaurantData, createTestRestaurant, deleteTestRestaurantById } = require('../../utils/restaurants');

chai.use(chaiHttp);
chai.use(sinonChai);

const expect = chai.expect;

const endpoint = '/api/user/register';

const TEST_RESTAURANT = generateTestRestaurantData();
const TEST_USER = generateTestUserData({ restaurantId: TEST_RESTAURANT.id });

describe('controller.user.registerUser', () => {
	before(async () => {  
		await createTestRestaurant(TEST_RESTAURANT);
	});
	after(async () => {
		await Promise.all([
			deleteTestUserById(TEST_USER.id),
			deleteTestRestaurantById(TEST_RESTAURANT.id),
		]);
	});
	it('Should register user', async () => {
		const res = await chai.request(app)
		.post(endpoint)
		.send(TEST_USER);
		expect(res).to.have.status(200);
		expect(res.text).to.be.a('string');
	});
});