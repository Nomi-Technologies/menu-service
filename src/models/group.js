const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    name: DataTypes.STRING,
  }, {});
  Group.associate = (models) => {
    Group.hasMany(models.Restaurant, {
      foreignKey: 'groupId',
    });
    Group.hasMany(models.User, {
      foreignKey: 'groupId',
    });
  };
  return Group;
};
