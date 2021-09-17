const caseless = require('caseless');
const { uploadImage } = require('../../utils/aws-s3-utils');

function imageUploadHelper(path, req, res) {
  const headers = caseless(req.headers);
  uploadImage(path, req, res, headers.get('content-type'));
}

module.exports = imageUploadHelper;
