const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { database } = require('./models')
const { passport } = require('./controller')

const port = process.env.PORT || 3000

const app = express()


var whitelist = ['https://nomi-technologies.github.io', 'localhost:8000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())

app.get("/", (req, res) => {
  res.json({ message: "Nomi API!" })
});

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
})

require("./routes")(app);