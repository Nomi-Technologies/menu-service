const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DB_NAME: process.env.DB_NAME,
  DATABASE_URL: process.env.DATABASE_URL,
  PROD: process.env.PROD,
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
};
