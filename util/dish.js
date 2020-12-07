const {
    Dish
} = require("../models");

const createDish = async (categoryId, dishInfo) => {
    try {
        const nextIdx = await Dish.count({
            where: {
                categoryId: categoryId
            }
        })
        return Dish.create({
            ...dishInfo,
            index: nextIdx
        })
    } catch (error) {
        throw error
    } 
}

module.exports = { createDish }