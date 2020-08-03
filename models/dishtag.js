'use strict';
module.exports = (sequelize, DataTypes) => {
  const DishTag = sequelize.define('DishTag', {
    dishId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  DishTag.associate = function(models) {
    // associations can be defined here
  };
  return DishTag;
};