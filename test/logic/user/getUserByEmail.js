const userLogic = require('../../../src/logic/user');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { User } = require('../../../src/models');

chai.use(sinonChai);
const expect = chai.expect;

const TEST_EMAIL = 'admin@test.com';

beforeEach(async () => {  
    sinon.restore()
});

afterEach(async () => {  
    sinon.restore()
});

describe('logic.user.getUserByEmail', () => {
	it('Should return User object given valid email', async () => {
		const getUserSpy = sinon.spy(User, 'getUser');
		const data = await userLogic.getUserByEmail(TEST_EMAIL);
		expect(getUserSpy).to.have.been.calledWith({ email: TEST_EMAIL });
		expect(data).to.be.an('object');
		expect(data).to.have.property('email');
	});
	it('Should return null given invalid email', async () => {
		const data = await userLogic.getUserByEmail('random@email.com');
		expect(data).to.be.null;
	});
});