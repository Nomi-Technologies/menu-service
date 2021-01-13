const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../index.js');

chai.use(chaiHttp);
chai.use(sinonChai);

const expect = chai.expect;
const TEST_USER = {
	email: "admin@test.com",
	password: "password123"
};
let token;

describe('controller.user.getUserDetails', () => {
	describe('controller.user.getUserDetails Authenticated Requests', () => {
		beforeEach(async () => {  
			const res = await chai.request(app)
			.post('/api/user/login')
			.send(TEST_USER);
			expect(res).to.have.status(200);
			token = res.body.token;
		});
		it('Should return user details if user is logged in', async () => {
			const res = await chai.request(app)
			.get('/api/user/details')
			.set('Authorization', 'Bearer ' + token);
			expect(res).to.have.status(200);
		});
	});
	describe('controller.user.getUserDetails Unauthenticated Requests', () => {
		beforeEach(async () => {  
			token = null;
		});
		it('Should return error if user is not logged in', async () => {
			const res = await chai.request(app)
			.get('/api/user/details')
			.set('Authorization', 'Bearer ' + token);
			expect(res).to.have.status(401);
		});
	});
	
});