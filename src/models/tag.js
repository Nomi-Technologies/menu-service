const { Sequelize, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  }, {});
  Tag.associate = (models) => {
    // associations can be defined here
    Tag.belongsToMany(models.Dish, {
      through: 'DishTag',
      as: 'Dishes',
      foreignKey: 'tagId',
      otherKey: 'dishId',
    });
    Tag.belongsToMany(models.Modification, {
      through: 'ModificationTag',
      as: 'Modifications',
      foreignKey: 'tagId',
      otherKey: 'modificationId',
    });
  };

  // gets a tag by name, case insensitive
  Tag.findByName = async (name) => Tag.findOne({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  return Tag;
};
