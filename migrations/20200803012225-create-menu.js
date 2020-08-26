'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Menu', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        },
        restaurantId: {
          type: Sequelize.INTEGER,
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