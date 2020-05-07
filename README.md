# Menu Service
REST API built with `node`, `express`, and `sequelize` for ORM. 

## To Run
```
$ npm install
```
```
$ npm run develop
```
If you'd like to reset db with the menu.csv file, go to data/ and run 
```
$ python gen.py
```
data/db-filler.js will be generated. This generated script will erase the database and fill in the menu items in the menu.csv file

## TODO:
[x] Basic DB
[X] Basic Authentication
[ ] Set up env
[ ] Validation [here](https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/)
[ ] Rework db schema to associate Users

