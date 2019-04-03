const { Pool } = require('pg');
// const Sequelize = require("sequelize");

const pool = new Pool({
  host: 'localhost',
  user: 'haoyancang',
  database: 'park_share'
  
});

pool.connect() 
  .then(() => console.log("PostgreSQL CONNECTION SUCCESSFUL"))
  .catch(err => console.error(err));

module.exports = pool;


