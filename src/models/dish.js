const { error } = require('console');
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
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
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    vp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    gfp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  Dish.associate = function (models) {
    Dish.belongsToMany(models.Tag, {
      through: 'DishTag',
      as: 'Tags',
      foreignKey: 'dishId',
      otherKey: 'tagId',
    });

    Dish.belongsToMany(models.Modification, {
      through: 'DishModification',
      as: 'Modifications',
      foreignKey: 'dishId',
      otherKey: 'modificationId',
    });

    Dish.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      onDelete: 'CASCADE',
    });

    Dish.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return Dish;
};
