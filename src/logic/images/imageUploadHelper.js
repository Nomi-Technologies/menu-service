const caseless = require('caseless');
const { serializeError } = require('serialize-error');
const { uploadImage } = require('../../utils/aws-s3-utils');
const logger = require('../../utils/logger');

function imageUploadHelper(path, req, res) {
  const headers = caseless(req.headers);
  uploadImage(path, req, res, headers.get('content-type'))
  .then((data) => res.send(data))
  .catch((err) => {
    logger.error(JSON.stringify(serializeError(err)));
    res.status(500).send({
      message: `An error occurred while uploading asset to ${path}`,
    });
  });
}

module.exports = imageUploadHelper;
