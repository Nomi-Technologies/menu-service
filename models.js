const Sequelize = require('sequelize')

const database = new Sequelize({
    database: 'mise',
    dialect: 'postgres',
    operatorsAliases: Sequelize.op
})

const Dish = database.define('dish', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    description: {type: Sequelize.STRING},
    addons: {type: Sequelize.STRING},
    allergens: {type: Sequelize.STRING},
    glutenFreePossible: {type: Sequelize.BOOLEAN, defaultValue: false},
    veganPossible: {type: Sequelize.BOOLEAN, defaultValue: false},
    canRemove: {type: Sequelize.STRING},
    notes: {type: Sequelize.STRING},
    tableTalkPoints: {type: Sequelize.STRING}
})

module.exports = {
    Dish,
    database
}