'use strict';
module.exports = (sequelize, DataTypes) => {
  const DishTag = sequelize.define('DishTag', {
    dishId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  DishTag.associate = function(models) {
    // associations can be defined here
    DishTag.belongsTo(models.Dish, { foreignKey: 'dishId', targetKey: 'id', as: "Dish"})
    DishTag.belongsTo(models.Tag, { foreignKey: 'tagId', targetKey: 'id', as: "Tag"})
  };
  return DishTag;
};