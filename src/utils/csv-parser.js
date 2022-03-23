/* eslint-disable */
const { Op } = require('sequelize');
const parse = require('csv-parse');
const { createCategory } = require('../logic/categories');
const { createModification } = require('../logic/modifications');
const { createDish } = require('../logic/dishes');
const {
    Category,
    Diet,
    Dish,
    Tag,
    Modification,
} = require('../models');

const menuTypes = {
    NOMI: "Nomi",
    SQUARE: "Square"
}

// converts list of allergen names to ids
let allergensToIds = async (allergens) => {
    let allergenIds = []

    if (allergens) {
        let splitAllergens = allergens.split(",")
        for (allergen of splitAllergens) {
            try {
                let tag = await Tag.findOne(
                    { where: { name: { [Op.iLike]: allergen.trim() } } }
                )
                if (tag) {
                    allergenIds.push(tag.id)
                }
            } catch (err) {
                throw err;
            }
        }
    }

    return allergenIds
}

let dietsToIds = async (diets) => {
    let dietIds = []

    if (diets) {
        let splitDiets = diets.split(",")
        for (diet of splitDiets) {
            try {
                let foundDiet = await Diet.findByName(diet.trim());
                if (foundDiet) {
                    dietIds.push(foundDiet.id)
                }
            } catch (err) {
                throw err;
            }
        }
    }
    return dietIds
}

let getOrCreateCategory = async (categoryName, menuId) => {
    try {
        let category = await Category.findOne({ where: { name: categoryName, menuId: menuId } })
        if (category) {
            return category.id
        } else {
            newCategory = await createCategory(menuId, { name: categoryName, menuId: menuId })
            return newCategory.id
        }
    } catch (err) {
        throw err
    }

}

let getOrCreateModification = async (modificationName, restaurantId) => {
    try {
        let modification = await Modification.findOne({ where: { name: modificationName, restaurantId: restaurantId } })
        if (modification) {
            return modification.id
        } else {
            newModification = await createModification(restaurantId, { name: modificationName, restaurantId: restaurantId })
            return newModification.id
        }
    } catch (err) {
        throw err
    }
}

const arrayDiff = (arr1, arr2) => arr1.concat(arr2).filter(val => !(arr1.includes(val) && arr2.includes(val)));

let parseMenu = async (menuType, menuId, restaurantId, output) => {
    let deduplicatedNames = new Set();

    for (let i = 0; i < output.length; i++) {
        let dish = output[i]
        let categoryId
        let allergenIds
        let dietIds
        let existingDish
        let vp = dish.VP !== ''
        let gfp = dish.GFP !== ''
        let modifiableAllergenIds

        // parse relevant information
        [categoryId, allergenIds, modifiableAllergenIds, dietIds] = await Promise.all([
            getOrCreateCategory(dish.Category, menuId),
            allergensToIds(dish.Allergens),
            allergensToIds(dish.Modifiable),
            dietsToIds(dish.Diets)
        ]).catch((err) => {
            throw err;
        });

        // Mapping Square's csv column names to Nomi's
        if (menuType === menuTypes.SQUARE) {
            dish.Name = dish['Item Name']
            dish.DishModification = dish['Variation Name']
        }

        if (!deduplicatedNames.has(dish.Name)) {
            deduplicatedNames.add(dish.Name)
        } else if (menuType === menuTypes.SQUARE) {
            modificationId = await getOrCreateModification(dish.DishModification, restaurantId)
            dish.setModifications(modificationId)
        }

        existingDish = await Dish.findOne({ where: { name: dish.Name, restaurantId: restaurantId, categoryId: categoryId } }).catch((err) => {
            throw err;
        });

        // check if dish exists
        let currDish
        if (existingDish) {
            let dishInfo = {
                description: dish.Description,
                price: dish.Price,
                tableTalkPoints: dish['Table Talk Points'],
                categoryId: categoryId,
                vp: vp,
                gfp: gfp
            }
            try {
                currDish = existingDish
                currDish.update(dishInfo)
            } catch (err) {
                throw err
            }
        } else {
            let dishInfo = {
                name: dish.Name,
                description: dish.Description,
                price: dish.Price,
                tableTalkPoints: dish['Table Talk Points'],
                categoryId: categoryId,
                menuId: menuId,
                restaurantId: restaurantId,
                vp: vp,
                gfp: gfp,
                index: i
            }
            try {
                currDish = await createDish(categoryId, dishInfo)
            } catch (err) {
                throw err
            }
        }
        try {
            let nonModifiableAllergenIds = arrayDiff(allergenIds, modifiableAllergenIds);
            await currDish.setTags(modifiableAllergenIds, { through: { removable: true } })
            await currDish.addTags(nonModifiableAllergenIds)
            await currDish.setDiets(dietIds)
        } catch (err) {
            throw err
        }
    }
}

let parseCSV = async (data, restaurantId, menuId, overwrite) => {
    return new Promise(async (finish, reject) => {
        parse(data, { columns: true }, async (err, output) => {
            if (err) {
                throw err
            } else {
                // Figures out which csv style is being used (Square, Nomi, etc.)
                let menuType
                if (output.length > 0) {
                    let columns = Object.keys(output[0]);
                    if (columns.includes("Table Talk Points")) {
                        menuType = menuTypes.NOMI;
                    } else if (columns.includes("Token") && columns.includes("SKU")) {
                        menuType = menuTypes.SQUARE;
                    } else {
                        menuType = menuTypes.NOMI;
                    }
                }
                try {
                    await parseMenu(menuType, menuId, restaurantId, output);
                } catch (err) {
                    reject(err);
                    throw err;
                }

                finish("finished")
            }
        })
    })
};

let dishAllergensToString = (tags) => {
    let allergenNames = []
    tags.forEach((tag) => {
        allergenNames.push(tag.name);
    })

    return allergenNames.join(', ')
}

let formatCell = (value) => {
    if (value && value.includes(',')) {
        return "\"" + value + "\""
    } else {
        return value
    }
}

// converts a menu object to csv format
let menuToCSV = async (menu) => {
    return new Promise(async (finish, reject) => {
        try {
            let csv_array = [];
            let header = [
                'Category',
                'Name',
                'Description',
                'Price',
                'Allergens',
                'Diets',
                'Modifiable',
                'GFP',
                'VP',
                'Table Talk Points'
            ]
            let num_parameters = header.length;

            csv_array.push(header);

            // loop over each category
            menu.Categories.forEach((category) => {
                category.Dishes.forEach(async (dish) => {
                    // create a row of empty strings of length header
                    row = Array(num_parameters).join(".").split(".")
                    row[header.indexOf('Category')] = formatCell(category.name)
                    row[header.indexOf('Name')] = formatCell(dish.name)
                    row[header.indexOf('Description')] = formatCell(dish.description)
                    row[header.indexOf('Price')] = formatCell(dish.price)
                    row[header.indexOf('Allergens')] = formatCell(dishAllergensToString(dish.Tags))
                    row[header.indexOf('Diets')] = formatCell(dishAllergensToString(dish.Diets))

                    // compile modifiable tags
                    let modifiableTags = []
                    dish.Tags.forEach((tag) => {
                        if (tag.DishTag.removable) {
                            modifiableTags.push(tag)
                        }
                    })
                    row[header.indexOf('Modifiable')] = formatCell(dishAllergensToString(modifiableTags))
                    row[header.indexOf('GFP')] = dish.GFP ? "X" : ""
                    row[header.indexOf('VP')] = dish.VP ? "X" : ""
                    row[header.indexOf('Table Talk Points')] = formatCell(dish.tableTalkPoints)
                    csv_array.push(row);
                })
            })

            let csv = csv_array.map(e => e.join(",")).join("\n");
            finish(csv);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = { parseCSV, menuToCSV, getOrCreateCategory }
