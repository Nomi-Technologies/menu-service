const {
  BUCKET_NAME,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
} = require("../config.js");

const aws = require("aws-sdk");
aws.config.update({
  region: "us-west-1",
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

module.exports.getFile = async (path) => {
  let data = await s3.getObject({
    Bucket: BUCKET_NAME,
    Key: path,
  }).promise();
  return data;
}
