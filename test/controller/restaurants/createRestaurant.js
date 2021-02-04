const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { generateTestRestaurantData, deleteTestRestaurantById } = require('../../utils/restaurants');

chai.use(chaiHttp);
chai.use(sinonChai);

const expect = chai.expect;

const endpoint = '/api/restaurants/register';

const TEST_RESTAURANT = generateTestRestaurantData();

describe('controller.restauarants.createRestaurant', () => {
	after(async () => {
		await deleteTestRestaurantById(TEST_RESTAURANT.id);
	});
	it('Should create restaurant', async () => {
		const res = await chai.request(app)
		.post(endpoint)
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
    });
    // set TEST_RESTAURANT.id to the id created by `createRestuarant` so that we can delete it in the `after` clause
    TEST_RESTAURANT.id = res.body.id;
	});
});