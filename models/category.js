'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    menuId: DataTypes.INTEGER
  }, {});
  Category.associate = function(models) {
    Category.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE'
    })

    Category.hasMany(models.Dish, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
      as: "Dishes"
    })
  };
  return Category;
};