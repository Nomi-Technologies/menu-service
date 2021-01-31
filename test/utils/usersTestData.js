const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { User } = require('../../models');

async function createTestUser(user) {
    // copy user object into testUser so that we can retain the password in the original user object.
    const testUser = Object.assign({}, user);
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
        }
    });
}

function generateTestUserData(user={}) {
    const testUser = {
        id: uuidv4(),
        email: user.email || Math.random().toString(),
        password: user.password || 'password123',
        phone: user.phone || Math.random().toString(),
        role: user.role || 1,
        restaurantId: user.restaurantId || uuidv4(),
        firstname: user.firstname || Math.random().toString(),
        lastname: user.lastname || Math.random().toString()
    };
    return testUser;
}

async function registerTestUser(user) {
    await createTestUser(user);
    return User.authenticate(user.email, user.password);
}

module.exports = {
    createTestUser,
    deleteTestUser,
    deleteTestUserById,
    generateTestUserData,
    registerTestUser,
}
