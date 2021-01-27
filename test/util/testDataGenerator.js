const { User } = require('../../models');

const TEST_USER = {
    email: ,
    password: ,
    phone: ,
    role: '1',
    restaurantId: '123',
    firstname: 'Test',
    lastname: 'User'
}

async function createTestUser(user) {
    const password = user.password || 'password123';
    const passwordHash = bcrypt.hashSync(password, 10);
    const testUser = {
        email: user.email,
        password: passwordHash,
        phone: user.phone || '5555555555',
        role: user.role || 1,
        restaurantId: user.restaurantId || ,
        firstname: user.firstname || 'Test',
        lastname: user.lastname || 'User'
    };
    User.create(testUser);
}

async function registerTestUser(user) {
    User.register
}


    let user = {
      email: email,
      password: passwordHash,
      phone: phone,
      role: role,
      restaurantId: restaurant,
      firstname: fname,
      lastname: lname
    };
  
    let created_user = await User.create(user);