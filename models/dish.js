'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    addons: DataTypes.STRING,
    canRemove: DataTypes.BOOLEAN,
    notes: DataTypes.STRING,
    tableTalkPoints: DataTypes.TEXT,
    restaurantId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    price: DataTypes.STRING,
  }, {});
  Dish.associate = function(models) {
    Dish.belongsToMany(models.Tag, {
      through: 'DishTag',
      as: 'Tags',
      foreignKey: 'dishId',
      otherKey: 'tagId',
    });

    Dish.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      onDelete: 'CASCADE'
    })

    Dish.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })
  };
  return Dish;
};