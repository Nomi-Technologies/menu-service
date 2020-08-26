'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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