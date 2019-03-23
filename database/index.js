const { Pool } = require('pg');
// const Sequelize = require("sequelize");

const pool = new Pool({
  host: 'localhost',
  user: 'taylorbantle',
  database: 'park_share'
});

pool.connect() 
  .then(() => console.log("PostgreSQL CONNECTION SUCCESSFUL"))
  .catch(err => console.error(err));

module.exports = pool;


