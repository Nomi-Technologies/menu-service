const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const database = new Sequelize({
  database: 'mise',
  dialect: 'postgres',
  operatorsAliases: Sequelize.op
})

const Dish = database.define('dish', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  category: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  addons: {type: Sequelize.STRING},
  canRemove: {type: Sequelize.STRING},
  notes: {type: Sequelize.STRING},
  tableTalkPoints: {type: Sequelize.STRING}
})

const Tag = database.define('tag', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false }, // 'Allergen, Diet, etc.'
  excludeForFilter: { type: Sequelize.BOOLEAN, allowNull: false } // e.g. exclude for peanuts or include for gluten-free possible
})

Dish.belongsToMany(Tag, { through: 'dishTag' });
Tag.belongsToMany(Dish, { through: 'dishTag' });

const User = database.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// TODO: Make sure user doesn't already exist and throw error
User.register = async (email, password) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  let user = {
    email: email,
    password: passwordHash
  }

  let created_user = await User.create(user)
  return User.authenticate(email, password);
}

User.getUser = async (obj) => {
  return await User.findOne({
    where: obj
  });
}

// used to validate the user
User.authenticate = async (email, password) => {
  let user = await User.findOne({where: {email: email}})
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  } else {
    return null;
  }
}

module.exports = {
  Dish,
  User,
  database,
  Tag,
}