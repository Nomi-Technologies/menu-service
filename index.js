const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const expressWinston = require('express-winston');
const Rollbar = require('rollbar');
const { ROLLBAR_ACCESS_TOKEN } = require('./config');
const logger = require('./src/utils/logger');

logger.info('Starting menu-service...');

const { passport } = require('./controller');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));
app.use(bodyParser.raw({
  type: 'image/*',
  limit: '10mb',
}));

// Logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.colorize(),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: (req, res) => false,
}));

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.json({ message: 'Nomi API!' });
});

require('./routes')(app);

if (process.env.DEPLOYMENT_CONTEXT === 'production') {
  const rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  
  app.use(rollbar.errorHandler());
}

module.exports = app;


app.server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
