const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { DB_NAME, PROD, DATABASE_URL } = require("./config.js");

let database = null;

// check if prod, setup heroku version of sequelize
if (PROD === "true") {
  console.log("Production mode is activated");
  database = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    operatorsAliases: Sequelize.op,
  });
} else {
  console.log("Debug mode is activated");
  console.log("initializing database");
  database = new Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    operatorsAliases: Sequelize.op,
    logging: (str) => {
      console.log(`[sequelize] ${str}`);
    }, //false
  });

  console.log("intitialize success");
}

const User = database.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("admin", "staff"),
    defaultValue: "staff",
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// TODO: Make sure user doesn't already exist and throw error
User.register = async (
  email,
  password,
  phone,
  role,
  restaurant,
  fname,
  lname
) => {
  const passwordHash = bcrypt.hashSync(password, 10);
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
  return User.authenticate(email, password);
};

User.getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

// used to validate the user
User.authenticate = async (email, password) => {
  let user = await User.findOne({ where: { email: email } });
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  } else {
    return null;
  }
};

const Dish = database.define("dish", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING },
  addons: { type: Sequelize.STRING },
  canRemove: { type: Sequelize.STRING },
  notes: { type: Sequelize.STRING },
  tableTalkPoints: { type: Sequelize.TEXT },
});

const Category = database.define("category", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
});

Category.hasMany(Dish, {onDelete: 'cascade'})
Dish.belongsTo(Category)
const Tag = database.define('tag', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false }, // 'Allergen, Diet, etc.'
  excludeForFilter: { type: Sequelize.BOOLEAN, allowNull: false }, // e.g. exclude for peanuts or include for gluten-free possible
});

const DishTags = database.define('dish_tags', {
  removable: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
});

Dish.belongsToMany(Tag, { through: DishTags });
Tag.belongsToMany(Dish, { through: DishTags });

// restaurant model
const Restaurant = database.define("restaurant", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueName: {
    type: Sequelize.STRING, unique: true, allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  published: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  indexes: [
    { unique: true, fields: ['uniqueName'] }
  ]
});

// One to many for restaurants
Restaurant.hasMany(Dish, { onDelete: "cascade" });
Dish.belongsTo(Restaurant);
Restaurant.hasMany(User, { onDelete: "cascade" });
Restaurant.hasMany(Category, { onDelete: "cascade" });
Category.belongsTo(Restaurant);

module.exports = {
  database,
  Dish,
  User,
  Tag,
  Restaurant,
  Category,
};
