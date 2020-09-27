'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Restaurant', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
        unique: true
      },
      uniqueName: {
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      streetAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      indexes: [
        { unique: true, fields: ['uniqueName'] }
      ]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Menu');
  }
};