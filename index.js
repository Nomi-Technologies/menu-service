const express = require('express')
const bodyParser = require('body-parser')

// const populateDB = require('./data/db-filler');

console.log("Starting menu-service...")

const { database } = require('./models')
const { passport } = require('./controller')

const port = process.env.PORT || 3000


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())

app.get("/", (req, res) => {
  res.json({ message: "Nomi API!" })
});

database.sync().then(() => {
  // populateDB();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
}).catch((err) => {
  console.error(err)
})


require("./routes")(app);