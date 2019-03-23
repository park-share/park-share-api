const pool = require('./index.js');


module.exports = {
  users: {
    post: (params, callback) => {
      console.log('in db post')
      const queryStr = 'insert into users (firstname, lastname, email, user_password,birthday,phone) values ($1,$2,$3,$4,$5,$6)';
      // console.log('this the the query',queryStr)
      // console.log("params",params)
      pool.query('SELECT exists (SELECT true FROM users WHERE "email" = $1)',(err,results) => {
        if (results==='t') {
          console.log('no!!!!!')
        } else {
            pool.query(queryStr,
              params,
              (results) => {
              callback(results)  
              }
            );
        }
      });
    },
    finduser: (params,callback)=> {
      console.log('in db find user')
      const queryStr = 'select * from users where email = $1';
      pool.query(queryStr, params, (err, results)=> {
        callback(err, results);
        // console.log(params);
      })
    }
  },
  // getOneByEmail: function(email) {
  //   return knex('user').where('email',email).first();
    // const queryStr = 'select * from user where "email"= $1';
    // pool.query('select id from user where "email"= $1',(err,results)=> {
    //   return results;
    // });
  // },
  // select exists(select true from users where email = 'hihihi')


  reservations: {
    reserve: (params, response) => {
      const { user_id, space_id, start_res, end_res } = params;
      const str = `INSERT INTO reservations (user_id, space_id, start_res, end_res) VALUES ('${user_id}', '${space_id}', '${start_res}', '${end_res}') RETURNING id;`;
      pool.query(str, (err, id) => {
        response(err, id);
      })
    },
    startRes: (params, response) => {
      const { id, actual_start } = params;
      const str = `UPDATE reservations SET actual_start='${actual_start}' WHERE id=${id};`;
      pool.query(str, (err) => {
        response(err);
      })
    },
    endRes: (params, response) => {
      const { id, actual_end } = params;
      const str = `UPDATE reservations SET actual_end='${actual_end}' WHERE id=${id};`;
      pool.query(str, (err) => {
        response(err);
      })
    },
        
  map: {
    availableSpots: (params, response) => {
      const str = 'SELECT * FROM unavailable;';
      pool.query(str, (err, spots) => {
        response(err, spots);
      })
    }
  }
  // reservations: {
  //   reserve: (params, response) => {
  //     const { user_id, space_id, start_res, end_res } = params;
  //     const str = `INSERT INTO reservations (user_id, space_id, start_res, end_res) VALUES ('${user_id}', '${space_id}', '${start_res}', '${end_res}') RETURNING id;`;
  //     pool.query(str, (err, id) => {
  //       response(err, id);
  //     })
  //   },
  //   startRes: (params, response) => {
  //     const { id, actual_start } = params;
  //     const str = `UPDATE reservations SET actual_start='${actual_start}' WHERE id=${id};`;
  //     pool.query(str, (err) => {
  //       response(err);
  //     })
  //   },
  //   endRes: (params, response) => {
  //     const { id, actual_end } = params;
  //     const str = `UPDATE reservations SET actual_end='${actual_end}' WHERE id=${id};`;
  //     pool.query(str, (err) => {
  //       response(err);
  //     })
  //   }
  // }
}
}