/* eslint-disable linebreak-style */
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Redirect = sequelize.define('Redirect', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    url: {
      type: DataTypes.STRING,
    },
  });
  Redirect.associate = () => { };
  return Redirect;
};
