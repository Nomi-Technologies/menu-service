'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Dish, {
      through: 'DishTag',
      as: 'dishes',
      foreignKey: 'tagId',
      otherKey: 'dishId'
    });
  };
  return Tag;
};