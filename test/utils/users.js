const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { JWT_SECRET } = require('../../config.js');

async function addFavoriteMenuByUserId(userId, menuId) {
  const user = await User.findByPk(userId);
  return user.addFavoriteMenu(menuId);
}

async function authenticateTestUser({ email, password }) {
  console.log('authenticating user');
  const authenticatedUser = await User.authenticate(email, password);
  if (authenticatedUser) {
    const payload = { email: authenticatedUser.email };
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  }
  return null;
}

async function createTestUser(user) {
  // copy user object into testUser so that we can retain the password in the original user object.
  const testUser = { ...user };
  const passwordHash = bcrypt.hashSync(testUser.password, 10);
  testUser.password = passwordHash;
  await User.create(testUser);
  return user;
}

async function deleteTestUser(user) {
  return user.destroy();
}

async function deleteTestUserById(userId) {
  // WARNING: deletes every matching entry
  return User.destroy({
    where: {
      id: userId,
    },
  });
}

function generateTestUserData(user = {}) {
  const testUser = {
    id: uuidv4(),
    email: user.email || Math.random().toString(),
    password: user.password || 'password123',
    phone: user.phone || Math.random().toString(),
    role: user.role || 1,
    restaurantId: user.restaurantId || uuidv4(),
    firstName: user.firstName || Math.random().toString(),
    lastName: user.lastName || Math.random().toString(),
  };
  return testUser;
}

module.exports = {
  addFavoriteMenuByUserId,
  authenticateTestUser,
  createTestUser,
  deleteTestUser,
  deleteTestUserById,
  generateTestUserData,
};
