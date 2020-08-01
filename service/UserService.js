const bcrypt = require("bcrypt");

module.exports = class {

  constructor(container) {
    this.userDAO = container.get('user.dao');
  }

  // Password hash excluded.
  findOne = async (criteria, includePassword = false) => {
    let attributes = ['id', 'email', 'phone', 'role', 'firstname', 'lastname', 'restaurantId', 'createdAt', 'updatedAt'];
    if (includePassword) {
      attributes.push('password');
    }
    return await this.userDAO.findOne({ 
      where: criteria,
      attributes: attributes,
    });
  };

  update = async (user, criteria) => {
    return await this.userDAO.update(user, { where: criteria });
  };

  register = async (user) => {
    const passwordHash = bcrypt.hashSync(user.password, 10);
    user.password = passwordHash;
    try {
      await this.userDAO.create(user);
      return user;
    } catch (err) {
      throw new Error(`Email ${user.email} has been registered.`);
    }
  };

  authenticate = async (email, password) => {
    let user = await this.findOne({ email: email }, true);
    console.log(password, user.password);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return null;
    }
  };

  contains = async (criteria) => {
    let result = await this.userDAO.findAndCountAll({ where: criteria });
    return result.count > 0;
  };
}