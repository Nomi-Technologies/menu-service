const {
    Dish,
    Tag,
    User,
    Restaurant,
    Category,
    Menu
  } = require("../models");

const { Op } = require("sequelize");


const parse = require('csv-parse')
const fs = require('fs');

// converts list of allergen names to ids
let allergensToIds = async (allergens) => {
    allergenIds = []
    allergens.split(",").forEach(async (allergen) => {
        let tag = await Tag.findOne(
            {where: { name: {[Op.iLike]: allergen.trim() }}}
        )
        if(tag) {
            allergenIds.push(tag.id)
        }
    })

    return allergenIds
}

let getOrCreateCategory = async (categoryName, menuId) => {
    category = await Category.findOne({where: { name: categoryName, menuId: menuId }})
    if(category) {
        return category.id
    } else {
        newCategory = await Category.create({ name: categoryName, menuId: menuId })
        return newCategory.id
    }
}

let parseCSV = async (data, restaurantId, menuId, overwrite) => {
    return new Promise(async finish => {
        parse(data, {columns: true}, async (err, output) => {
            if(err) {
                throw err
            } else {
                for(let i = 0; i < output.length; i++) {
                    let dish = output[i]
                    let categoryId = await getOrCreateCategory(dish.Category, menuId)
                    let allergenIds = await allergensToIds(dish.Allergens)
                    let existingDish = await Dish.findOne({where: {name: dish.Name, restaurantId: restaurantId}})
    
                    if(existingDish) {
                        await existingDish.update({
                            description: dish.Description,
                            price: dish.Price,
                            tableTalkPoints: dish['Table Talk Points'],
                            categoryId: categoryId
                        })
                        await existingDish.setTags(allergenIds)
                    } else {
                        try {
                            let newDish = await Dish.create({
                                name: dish.Name,
                                description: dish.Description,
                                price: dish.Price,
                                tableTalkPoints: dish['Table Talk Points'],
                                categoryId: categoryId,
                                menuId: menuId,
                                restaurantId: restaurantId
                            })
                            await newDish.setTags(allergenIds)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                }
                finish("finished")
            }
        })
    })
};

module.exports = { parseCSV }