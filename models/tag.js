'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Dish, {
      through: 'DishTag',
      as: 'Dishes',
      foreignKey: 'tagId',
      otherKey: 'dishId'
    });
  };
  return Tag;
};