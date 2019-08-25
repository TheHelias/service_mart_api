require('dotenv').config();

module.exports = {

  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'service_mart-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'service_mart-prod',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },

};