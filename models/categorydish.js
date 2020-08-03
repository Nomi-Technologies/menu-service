'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryDish = sequelize.define('CategoryDish', {
    dishId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  CategoryDish.associate = function(models) {
    // associations can be defined here
  };
  return CategoryDish;
};