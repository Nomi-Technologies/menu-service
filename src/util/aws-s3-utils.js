const { serializeError } = require('serialize-error');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const {
  BUCKET_NAME,
  ENV_SPEC_BUCKET_NAME,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
} = require('../config.js');

aws.config.update({
  region: 'us-west-1',
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

module.exports.getStaticFile = async (path) => {
  const data = await s3.getObject({
    Bucket: BUCKET_NAME,
    Key: path,
  }).promise();
  return data;
};

module.exports.uploadFile = async (path, data, type) => {
  const result = await s3.upload({
    Bucket: ENV_SPEC_BUCKET_NAME,
    Key: path,
    Body: data,
    ContentType: type,
  }).promise();
  return `File uploaded at ${result.Key}`;
};

module.exports.getFile = async (path) => {
  const data = await s3.getObject({
    Bucket: ENV_SPEC_BUCKET_NAME,
    Key: path,
  }).promise();
  return data;
};

module.exports.uploadImage = async (path, req, res, type) => {
  const storage = multerS3({
    s3,
    bucket: ENV_SPEC_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, path);
    },
  });
  const upload = multer({ storage }).single('file');

  upload(req, res, (err) => {
    if (err) {
      console.log(JSON.stringify(serializeError(err)));
    }
  });
};
