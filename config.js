const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME
  };
