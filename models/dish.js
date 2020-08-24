'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    addons: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    canRemove: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    tableTalkPoints: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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