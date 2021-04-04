const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: ''
    }
  }, {});

  User.associate = (models) => {
    User.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE',
    });

    User.belongsToMany(models.Menu, {
      through: 'FavoriteMenu',
      as: 'FavoriteMenus',
      foreignKey: 'userId',
      otherKey: 'menuId',
    });
  };

  User.register = async (
    email,
    password,
    phone,
    role,
    restaurant,
    fname,
    lname,
  ) => {
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = {
      email,
      password: passwordHash,
      phone,
      role,
      restaurantId: restaurant,
      firstName: fname,
      lastName: lname,
    };

    await User.create(user);
    return User.authenticate(email, password);
  };

  User.updatePassword = async (id, newPassword) => {
    const passwordHash = bcrypt.hashSync(newPassword, 10);

    return User.findOne({ where: { id } })
    .then((user) => user
    .update({ password: passwordHash }))
    .catch((err) => {
      throw err;
    });
  };

  User.getUser = async (obj) => User.findOne({ where: obj });

  // used to validate the user
  User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  };

  return User;
};
