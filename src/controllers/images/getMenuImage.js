const { imageDownloadHelper } = require('../../logic/images');

async function getMenuImage(req, res) {
  imageDownloadHelper(`menus/${req.params.id}`, req, res);
}

module.exports = getMenuImage;
