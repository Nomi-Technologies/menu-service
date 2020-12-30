const test = require('mocha');
const userLogic = require('../../logic/user')
const sinon = require('sinon')
const { User } = require('../../../src/models/user')

test.before(() => {
  // stubs
  sinon.stub(User, 'findOne').resolve(false);
  sinon.stub(User, 'update').withArgs('gbains@usc.edu').resolve(true);
})

test('Should return user details') {
  t.true(userLogic.getUserDetails('gbains@usc.edu'));
}

test('Should throw error') {
  t.throws(Error);
}
