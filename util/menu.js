const {
    Dish,
    Category
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

const createCategory = async (menuId, categoryInfo) => {
    try {
        const nextIdx = await Category.count({
            where: {
                menuId: menuId
            }
        })
        return Category.create({
            ...categoryInfo,
            index: nextIdx
        })
    } catch (error) {
        throw error
    } 
}

module.exports = { createDish, createCategory }