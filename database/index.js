const { Pool } = require('pg');
// const Sequelize = require("sequelize");

const pool = new Pool({
  // host: '54.183.143.103',
  // port: 5432,
  // database: 'park_share',
  // user: 'postgres',
  // password: 'parkshare'
  host: 'localhost',
  user: 'haoyancang',
  database: 'park_share'
  
});

pool.connect() 
  .then(() => console.log("PostgreSQL CONNECTION SUCCESSFUL"))
  .catch(err => console.error(err));

module.exports = pool;


