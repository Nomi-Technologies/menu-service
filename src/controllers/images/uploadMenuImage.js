const { imageUploadHelper } = require('../../logic/images');

async function uploadMenuImage(req, res) {
  imageUploadHelper(`menus/${req.params.id}`, req, res);
}

module.exports = uploadMenuImage;
