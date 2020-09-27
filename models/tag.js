'use strict';
const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
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