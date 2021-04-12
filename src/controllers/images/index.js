const caseless = require('caseless');
const { serializeError } = require('serialize-error');
const {
  getFile, uploadImage,
} = require('../../utils/aws-s3-utils');

const imageUploadHelper = (path, req, res) => {
  const headers = caseless(req.headers);
  uploadImage(path, req, res, headers.get('content-type'))
        .then((data) => res.send(data))
        .catch((err) => {
          console.log(JSON.stringify(serializeError(err)));
          res.status(500).send({
            message: `An error occurred while uploading asset to ${path}`,
          });
        });
};

const imageDownloadHelper = (path, req, res) => {
  getFile(path)
        .then((data) => {
          res.setHeader('Content-Type', data.ContentType);
          res.send(data.Body);
        })
        .catch((err) => {
          console.log(err);
          res.status(err.statusCode).send({
            message: err.message,
          });
        });
};

module.exports.uploadRestaurantImage = async (req, res) => {
  imageUploadHelper(`restaurants/${req.params.id}`, req, res);
};

module.exports.getRestaurantImage = async (req, res) => {
  imageDownloadHelper(`restaurants/${req.params.id}`, req, res);
};

module.exports.uploadMenuImage = async (req, res) => {
  imageUploadHelper(`menus/${req.params.id}`, req, res);
};

module.exports.getMenuImage = async (req, res) => {
  imageDownloadHelper(`menus/${req.params.id}`, req, res);
};

module.exports.uploadDishImage = async (req, res) => {
  imageUploadHelper(`dishes/${req.params.id}`, req, res);
};

module.exports.getDishImage = async (req, res) => {
  imageDownloadHelper(`dishes/${req.params.id}`, req, res);
};
