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
$ npm start
```
