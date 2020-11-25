'use strict';
const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      restaurantId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      enableFiltering: {
        type: DataTypes.BOOLEAN,
        default: true
      },
      published: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      }
    }, {
      indexes: [{
        unique: true,
        fields: ['name', 'restaurantId'],
        name: 'UniqueMenuNameIndex',
      }]
    }
  );
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