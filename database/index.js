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


// const connection = new Sequelize("park_share", "haoyancang", "", {
//   host: "localhost",
//   dialect: "postgres",
//   operatorAliases: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// connection
//   .authenticate()
//   .then(() => {

//     console.log('connected')
//   })
//   .catch(err =>{
//     console.log('unable to connect to the postgres database', err);
//   });

// module.exports = connection;
