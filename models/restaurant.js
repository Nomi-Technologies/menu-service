'use strict';

module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
        uniqueName: {
          type: DataTypes.STRING, 
          unique: true, 
          allowNull: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        streetAddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        state: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        zip: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: true
        },
      }, {
        indexes: [
          { unique: true, fields: ['uniqueName'] }
        ]
      });
    Restaurant.associate = function(models) {
      // associations can be defined here
      Restaurant.hasMany(models.User, {
          foreignKey: 'restaurantId',
      })

      Restaurant.hasMany(models.Dish, {
        foreignKey: 'restaurantId'
      })
    };
    return Restaurant;
}