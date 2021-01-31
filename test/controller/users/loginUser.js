const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');

chai.use(chaiHttp);
chai.use(sinonChai);

const expect = chai.expect;

const endpoint = '/api/user/login';

const TEST_USER = {
	email: "admin@test.com",
	password: "password123"
};

describe('controller.users.getUserDetails', () => {
	it('Should return user token', async () => {
		const res = await chai.request(app)
		.post(endpoint)
		.send(TEST_USER);
		expect(res).to.have.status(200);
		expect(res.body.token).to.be.a('string');
	});
});