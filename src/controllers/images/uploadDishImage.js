const { imageUploadHelper } = require('../../logic/images');

async function uploadDishImage(req, res) {
  imageUploadHelper(`dishes/${req.params.id}`, req, res);
}

module.exports = uploadDishImage;
