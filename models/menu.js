'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    restaurantId: DataTypes.INTEGER,
    published: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: true
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['name', 'restaurantId'],
      name: 'UniqueMenuNameIndex',
    }]
  });
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      onDelete: 'CASCADE'
    })

    Menu.hasMany(models.Category, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE'
    })
  };
  return Menu;
};