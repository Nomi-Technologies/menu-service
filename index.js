const db = require('./models');
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
  db.Tag.findAll().then((result) => {
    if(result.length == 0) {
      console.log("Initializing Tags")
      db.Tag.create({
        name: "Dairy",
        type: "allergen",
        excludeForFilter: true,
      });
    
      
      db.Tag.create({
        name: "Gluten",
        type: "allergen",
        excludeForFilter: true,
      });
    
      
      db.Tag.create({
        name: "Treenuts",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Egg",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Soy",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Shellfish",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Fish",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Seeds",
        type: "allergen",
        excludeForFilter: true,
      });  
      db.Tag.create({
        name: "Sesame",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Garlic",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Onion",
        type: "allergen",
        excludeForFilter: true,
      });
      db.Tag.create({
        name: "Cilantro",
        type: "allergen",
        excludeForFilter: true,
      });    
      db.Tag.create({
        name: "Truffle",
        type: "allergen",
        excludeForFilter: true,
      });
    }
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
}).catch((err) => {
  console.error(err)
})


require("./routes")(app);