# Menu Service
REST API built with `node`, `express`, and `sequelize` for ORM. 


## Getting started
Install packages
```
$ npm install
```
To make sure that your local database is up-to-date, run
```
$ npx sequelize db:create
$ npx sequelize db:migrate
```
To apply test data in seeders/, run
```
$ npx sequelize db:seed:all
```
To remove test data, run
```
$ npx sequelize db:seed:undo:all
```

To start development server: 
```
$ npm run develop
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
