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
  console.log("Populating DB")

  await database.Dish.destroy({ where: {} })
  await database.Tag.destroy({ where: {} })

  let dish = await Dish.create({
    name: 'Dish1',
    category: 'Cold',
    tableTalkPoints: 'Talk points...',
  });
  let dish2 = await Dish.create({
    name: 'Dish2',
    category: 'Cold',
    tableTalkPoints: 'Talk points...',
  });
  let dish3 = await Dish.create({
    name: 'Dish3',
    category: 'Brunch',
    tableTalkPoints: 'Talk points...',
  });
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
  dish.addTag(gluten);
  dish2.setTags([gluten, peanut]);
};


require("./routes")(app);