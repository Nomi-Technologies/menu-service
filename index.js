const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./src/utils/logger');
var winston = require('winston'),
    expressWinston = require('express-winston');  

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
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.json({ message: 'Nomi API!' });
});

require('./routes')(app);

if(process.env.NODE_ENV === 'production') {
  const Rollbar = require('rollbar');
  const { ROLLBAR_ACCESS_TOKEN } = require('./config');
  
  rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
  
  app.use(rollbar.errorHandler());
}

module.exports = app;


app.server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
