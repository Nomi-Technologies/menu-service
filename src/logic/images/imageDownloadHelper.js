const { getFile } = require('../../utils/aws-s3-utils');
const logger = require('../../utils/logger');

function imageDownloadHelper(path, req, res) {
  getFile(path)
  .then((data) => {
    res.setHeader('Content-Type', data.ContentType);
    res.send(data.Body);
  })
  .catch((err) => {
    logger.error(err);
    res.status(err.statusCode).send({
      message: err.message,
    });
  });
}

module.exports = imageDownloadHelper;
