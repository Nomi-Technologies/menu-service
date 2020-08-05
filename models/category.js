'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    menuId: DataTypes.INTEGER
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(models.Dish, {
      through: 'CategoryDish',
      as: 'Dishes',
      foreignKey: 'dishId',
      otherKey: 'categoryId',
    });

    Category.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE'
    })
  };
  return Category;
};