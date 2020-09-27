'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Menu', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        },
        restaurantId: {
          type: Sequelize.UUID,
          onDelete: 'CASCADE',
          references: {
            model: 'Restaurant',
            key: 'id',
            as: 'restaurantId'
          }
        },
        published: {
          type: Sequelize.BOOLEAN,
          default: false,
          allowNull: false,
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
        indexes: [{
          unique: true,
          fields: ['name', 'restaurantId'],
          name: 'UniqueMenuNameIndex',
        }]
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Menu');
  }
};