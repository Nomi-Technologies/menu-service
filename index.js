const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { database, Dish, Tag } = require('./models')
const { passport } = require('./controller')

const port = process.env.PORT || 3000

const app = express()

// app.use(cors())
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
    })
  })

// Placeholder db data
const populateDB = async () => {
  await database.Tag.destroy({ where: {} })

  let gluten = await Tag.create({
    name: 'Gluten',
    type: 'allergen',
    excludeForFilter: true,
  });
  let peanut = await Tag.create({
    name: 'Peanut',
    type: 'allergen',
    excludeForFilter: true,
  });
};


require("./routes")(app);