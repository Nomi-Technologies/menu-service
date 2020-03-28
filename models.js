const Sequelize = require('sequelize')

const database = new Sequelize({
    database: 'mise',
    dialect: 'postgres',
    operatorsAliases: Sequelize.op
})

const Dish = database.define('dish', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false }  
})

module.exports = {
    Dish,
    database
}