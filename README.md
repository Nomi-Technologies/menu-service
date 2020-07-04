# Menu Service
REST API built with `node`, `express`, and `sequelize` for ORM. 

## To Run

```
$ npm run develop
```
If you'd like to reset db with the menu.csv file, go to data/ and run 
```
$ python gen.py
```
data/db-filler.js will be generated. This generated script will erase the database and fill in the menu items in the menu.csv file. Before restarting the server, go to index.js and uncomment line 4 and 26.
```
 4  // const populateDB = require('./data/db-filler');
26    // populateDB();
```

## Getting started
Install packages
```
$ npm install
```

Create a database:
```
$ createdb nomi
```

### dotenv
If running locally, create a `.env` file with the following content:
```
JWT_SECRET=<any string>
DB_NAME=<your database name, probably mise>
PROD=false
AWS_S3_BUCKET_NAME=nomi-cloud-services
AWS_S3_ACCESS_KEY_ID=<your access key>
AWS_S3_SECRET_ACCESS_KEY=<your secret key>
```

### Migration
Since we use Sequelize as our ORM tool, we will use their [migration tool](https://github.com/sequelize/cli#documentation) for any future modifications to our database schema.