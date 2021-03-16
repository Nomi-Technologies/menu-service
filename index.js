const db = require('./src/models');
const express = require('express')
const bodyParser = require('body-parser')

console.log("Starting menu-service...")

const { passport } = require('./controller')

const port = process.env.PORT || 3000

const app = express()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));
app.use(bodyParser.raw({
  type: 'image/*',
  limit: '10mb',
}));

app.use(passport.initialize())

app.get("/", (req, res) => {
  res.json({ message: "Nomi API!" })
});

app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

if(process.env.NODE_ENV === 'production') {
  const Rollbar = require('rollbar');
  const { ROLLBAR_ACCESS_TOKEN } = require('./config');
  
  rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true
  })
  
  app.use(rollbar.errorHandler());
}

require("./routes")(app);

module.exports = app;