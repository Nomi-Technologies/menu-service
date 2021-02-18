const { Dish } = require('../../models');

async function createDish(categoryId, dishInfo, { dishTags, dishDiets, dishModifications }) {
    try {
        const nextIdx = await Dish.count({
            where: {
                categoryId: categoryId
            }
        });
        const dish = await Dish.create({
            ...dishInfo,
            index: nextIdx
        });

        if(dishTags) {
            await dish.setTags(dishTags)
        }
        if(dishDiets) {
            await dish.setDiets(dishDiets)
        }
        if(dishModifications) {
            await dish.setModifications(dishModifications)
        }

        return dish;
    }
    catch(err) {
        throw err;
    }
}

module.exports = createDish;