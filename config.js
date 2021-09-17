const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  BUCKET_NAME: process.env.AWS_S3_SHARED_BUCKET_NAME,
  ENV_SPEC_BUCKET_NAME: process.env.AWS_S3_ENV_BUCKET_NAME,
  ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
  ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN,
};
