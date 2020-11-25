'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RestaurantGroup.init({
    id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'RestaurantGroup',
  });

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
};