'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPermission = sequelize.define('UserPermission', {
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    restaurantId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    removable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {});
  UserPermission.associate = function(models) {
    // associations can be defined here
    UserPermission.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: "User" });
    UserPermission.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', targetKey: 'id', as: "Restaurant" });
  };

  UserPermission.getUserPermission = async (obj) => {
    return await UserPermission.findOne({
      where: obj,
    });
  };

  return UserPermission;
};
