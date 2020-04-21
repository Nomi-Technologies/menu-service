const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { database } = require('./models')
const { passport } = require('./controller')

const db = require('./models');

const port = process.env.SERVER_PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ message: "Nomi API!" });
});



  

database.sync().then(() => {
    populateDB();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })

// Placeholder db data
const populateDB = async () => {
  await db.Dish.destroy({ where: {} });
  await db.Tag.destroy({ where: {} });

  let dish = await db.Dish.create({
    name: 'Dish1',
    tableTalkPoints: 'Talk points...',
  });
  let tag = await db.Tag.create({
    name: 'gluten',
    type: 'allergen',
    excludeForFilter: true,
  });
  dish.addTag(tag);

};


require("./routes")(app);