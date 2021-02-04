const { deleteDishById } = require('../../logic/dishes');

async function bulkDeleteDish(req, res) {
    const dishIds = req.body.dishesToDelete;
    try {
        await deleteDishById(dishIds);
        res.send({
            message: 'Dishes were deleted successfully',
        });
    }
    catch(err) {
        res.status(500).send({
            message: err.message || 'An error occured while deleting dishes',
        });
    }
};

module.exports = bulkDeleteDish;