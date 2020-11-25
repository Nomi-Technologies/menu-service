'use strict';
const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    restaurantGroupId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    }
  }, {});

  User.associate = models => {
    User.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      onDelete: 'CASCADE'
    });

    User.belongsToMany(models.Menu, {
      through: 'FavoriteMenu',
      as: 'FavoriteMenus',
      foreignKey: 'userId',
      otherKey: 'menuId'
    })

    User.belongsTo(models.RestaurantGroup, {
      foreignKey: 'restaurantGroupId',
      onDelete: 'CASCADE'
    })
  }

  User.register = async (
    email,
    password,
    phone,
    role,
    restaurant,
    fname,
    lname
  ) => {
    const passwordHash = bcrypt.hashSync(password, 10);
    let user = {
      email: email,
      password: passwordHash,
      phone: phone,
      role: role,
      restaurantId: restaurant,
      firstname: fname,
      lastname: lname
    };
  
    let created_user = await User.create(user);
    return User.authenticate(email, password);
  };

  User.updatePassword = async (id, newPassword) => {
    const passwordHash = bcrypt.hashSync(newPassword, 10);
    User.findOne({ where: { id: id } }).then((user) => {
      return user.update({password: passwordHash});
    }).catch((err) => {
      throw err
    })
  }
  
  User.getUser = async (obj) => {
    return await User.findOne({
      where: obj,
    });
  };
  
  // used to validate the user
  User.authenticate = async (email, password) => {
    let user = await User.findOne({ where: { email: email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return null;
    }
  };

  return User;
};