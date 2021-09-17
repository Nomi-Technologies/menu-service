const { imageDownloadHelper } = require('../../logic/images');

async function getDishImage(req, res) {
  imageDownloadHelper(`dishes/${req.params.id}`, req, res);
}

module.exports = getDishImage;
