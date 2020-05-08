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

## dotenv
If running locally, create a `.env` file with the following content:
```
JWT_SECRET=<any string>
DB_NAME=<your database name, probably mise>
PROD=false
AWS_S3_BUCKET_NAME=nomi-cloud-services
AWS_S3_ACCESS_KEY_ID=<your access key>
AWS_S3_SECRET_ACCESS_KEY=<your secret key>
```

## TODO:
[x] Basic DB
[X] Basic Authentication
[ ] Set up env
[ ] Validation [here](https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/)
[ ] Rework db schema to associate Users

