'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuDish = sequelize.define('MenuDish', {
    dishId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  MenuDish.associate = function(models) {
    // associations can be defined here
    MenuDish.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })

    MenuDish.belongsTo(models.Dish, {
      foreignKey: 'dishId',
      onDelete: 'CASCADE'
    })
  };
  return MenuDish;
};