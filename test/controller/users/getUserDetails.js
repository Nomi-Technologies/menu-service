const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');
const { authenticateTestUser } = require('../../utils/users');

chai.use(chaiHttp);
chai.use(sinonChai);

const expect = chai.expect;

const endpoint = '/api/user/details';

const TEST_USER = {
	email: "admin@test.com",
	password: "password123"
};
let token;

describe('controller.users.getUserDetails', () => {
	after(async () => {  
		app.server.close();
	});
	describe('controller.users.getUserDetails Authenticated Requests', () => {
		before(async () => {  
			token = await authenticateTestUser(TEST_USER);
			expect(token).to.not.be.null;
		});
		it('Should return user details if user is logged in', async () => {
			const res = await chai.request(app)
			.get(endpoint)
			.set('Authorization', 'Bearer ' + token);
			expect(res).to.have.status(200);
		});
	});
	describe('controller.users.getUserDetails Unauthenticated Requests', () => {
		before(async () => {  
			token = null;
		});
		it('Should return error if user is not logged in', async () => {
			const res = await chai.request(app)
			.get(endpoint)
			.set('Authorization', 'Bearer ' + token);
			expect(res).to.have.status(401);
		});
	});
	
});