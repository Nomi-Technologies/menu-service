const test = require('mocha');
const userLogic = require('../../logic/user')

test('Should return user details') {
  assert(userLogic.updateUserDetails('gbains@usc.edu'))
}

test('Should throw error') {
  t.throws(Error)
}
