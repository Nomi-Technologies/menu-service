const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    index: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    menuId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  }, {});
  Category.associate = (models) => {
    Category.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE',
    });

    Category.hasMany(models.Dish, {
      foreignKey: 'categoryId',
    });
  };
  return Category;
};
