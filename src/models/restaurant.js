const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    uniqueName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  }, {
    indexes: [
      { unique: true, fields: ['uniqueName'] },
    ],
  });
  Restaurant.associate = (models) => {
    // associations can be defined here
    Restaurant.hasMany(models.User, {
      foreignKey: 'restaurantId',
    });

    Restaurant.hasMany(models.Dish, {
      foreignKey: 'restaurantId',
    });

    Restaurant.hasMany(models.Menu, {
      foreignKey: 'restaurantId',
    });

    Restaurant.hasMany(models.Modification, {
      foreignKey: 'restaurantId',
    });
  };
  return Restaurant;
};
