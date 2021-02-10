const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const userLogic = require('../../../src/logic/users');
const { User } = require('../../../src/models');

chai.use(sinonChai);
const { expect } = chai;

const TEST_ID = '9d026dae-98d5-4e64-8be8-17d9bd07b797';

describe('logic.user.getUserById', () => {
  afterEach(async () => {
    sinon.restore();
  });
  it('Should return User object given valid id', async () => {
    const getUserSpy = sinon.spy(User, 'getUser');
    const data = await userLogic.getUserById(TEST_ID);
    expect(getUserSpy).to.have.been.calledWith({ id: TEST_ID });
    expect(data).to.be.an('object');
    expect(data).to.have.property('email');
  });
  it('Should return null given invalid id', async () => {
    const data = await userLogic.getUserById('00000000-0000-0000-0000-000000000000');
    expect(data).to.be.null;
  });
});
