# Cached Messaging Service

## Technologies
* NodeJs (Typescript)
* Redis (ioredis)
* Sequelize (Postgres) 
* Heroku

## Setup Project Locally

* Ensure postgres is installed and correctly setup
* Ensure Redis is installed
* Populate the db with sql dump
* Clone Repository

```bash
git clone `https://github.com/abahernest/typescript_microservice_api.git`
cd typescript_microservice_api
```
* Create a .env file identical to `env.example` file
* Install dependencies `npm install`
* Start application `npm run dev` or `npm start`   

```
npm run dev     // this runs the app with nodemon and uses ts-node to run the server.ts file
npm start       //this compiles the code to js in a `dist` folder at root directory and uses node to run the server.js file
```

## Test

```bash
npm run test
```

## Postman Documentation

[Postman Doc](https://documenter.getpostman.com/view/11044390/UVyrUc7b)
