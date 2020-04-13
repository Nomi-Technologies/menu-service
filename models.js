const Sequelize = require('sequelize')

const database = new Sequelize({
  database: 'mise',
  dialect: 'postgres',
  operatorsAliases: Sequelize.op
})

const Dish = database.define('dish', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  description: {type: Sequelize.STRING},
  addons: {type: Sequelize.STRING},
  // allergens: {type: Sequelize.STRING},
  // glutenFreePossible: {type: Sequelize.BOOLEAN, defaultValue: false},
  // veganPossible: {type: Sequelize.BOOLEAN, defaultValue: false},
  canRemove: {type: Sequelize.STRING},
  notes: {type: Sequelize.STRING},
  tableTalkPoints: {type: Sequelize.STRING}
})

const Allergen = database.define('allergen', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  icon: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING, allowNull: false }
});

const Tag = database.define('tag', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false }
})

const DishAllergen = database.define('dishAllergen', {});

const DishTag = database.define('dishTag', {});

Dish.hasMany(DishAllergen);
Allergen.hasMany(DishAllergen);
Dish.hasMany(DishTag);
Tag.hasMany(DishTag);

module.exports = {
  Dish,
  Allergen,
  DishAllergen,
  Tag,
  DishTag,
  database
}