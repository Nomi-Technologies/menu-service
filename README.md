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

To run all tests: 
```
$ npm test
```
For running specific tests, see the `package.json` for `npm run test-custom`
For more nuanced tests, you can run mocha test manually with whatever options you choose, see https://mochajs.org/#command-line-usage

### dotenv
If running locally, create a `.env` file with the following content:
```
JWT_SECRET=<any string>
DB_NAME=<db name i.e "nomi-dev">
```


TEST