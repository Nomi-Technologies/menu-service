'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  }, {});
  Category.associate = function(models) {
    Category.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE'
    })

    Category.hasMany(models.Dish, {
      foreignKey: 'categoryId',
    })
  };
  return Category;
};