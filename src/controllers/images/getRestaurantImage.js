const { imageDownloadHelper } = require('../../logic/images');

async function getRestaurantImage(req, res) {
  imageDownloadHelper(`restaurants/${req.params.id}`, req, res);
}

module.exports = getRestaurantImage;
