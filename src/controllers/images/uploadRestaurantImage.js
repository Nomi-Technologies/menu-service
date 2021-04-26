const { imageUploadHelper } = require('../../logic/images');

async function uploadRestaurantImage(req, res) {
  imageUploadHelper(`restaurants/${req.params.id}`, req, res);
}

module.exports = uploadRestaurantImage;
