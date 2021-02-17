const { Category } = require('../../models');

async function createCategory(menuId, categoryInfo) {
    try {
        const nextIdx = await Category.count({
            where: {
                menuId: menuId
            }
        });
        return Category.create({
            ...categoryInfo,
            index: nextIdx
        });
    }
    catch(err) {
        throw err;
    }
}

module.exports = createCategory;