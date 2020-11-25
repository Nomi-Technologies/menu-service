'use strict';
const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const RestaurantGroup = sequelize.define('RestaurantGroup', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
    }, {});
  RestaurantGroup.associate = function(models) {
    // associations can be defined here
    RestaurantGroup.hasMany(models.User, {
      foreignKey: 'restaurantGroupId',
    })

    RestaurantGroup.hasMany(models.Restaurant, {
      foreignKey: 'restaurantGroupId'
    })
  };
  return RestaurantGroup;
}