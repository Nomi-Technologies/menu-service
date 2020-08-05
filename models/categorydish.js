'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryDish = sequelize.define('CategoryDish', {
    dishId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  CategoryDish.associate = function(models) {
    // associations can be defined here
    CategoryDish.belongsTo(models.Dish, { foreignKey: 'dishId', targetKey: 'id', as: "Dish"})
    CategoryDish.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: "Category"})
  };
  return CategoryDish;
};