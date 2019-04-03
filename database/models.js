const pool = require('./index.js');


module.exports = {
  users: {
    post: (params, callback) => {
      console.log('in db post')
      const queryStr = 'insert into users (firstname, lastname, email, user_password,birthday,phone) values ($1,$2,$3,$4,$5,$6)';
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
    finduser: (params, response)=> {
      console.log('in db find user')
      const queryStr = 'select * from users where email = $1';
      pool.query(queryStr, params, (err, results)=> {
        if(results.rowCount === 0) {
          response(err,null)
        } else {
          response(null,results)
        }
      })
    }
  },

  reservations: {
    reserve: (params, response) => {
      const { user_id, space_id, start_res, end_res } = params.spot;
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
    }
  },
        
  map: {
    availableSpots: (params, response) => {
      // console.log('in available spots')
      const str = `SELECT s.*, JSON_STRIP_NULLS(JSON_AGG(JSON_BUILD_OBJECT('id', u.u_id, 'start', u.unavailable_start, 'end', u.unavailable_end))) AS notAvail FROM spaces s LEFT OUTER JOIN unavailable u ON s.id = u.space_id GROUP BY s.id`;
      pool.query(str, (err, spots) => {
        response(err, spots);
      })
    }
  },

  schedule: {
    getReservations: (params, response) => {
      const { id } = params;
      const str = `SELECT * FROM spaces s inner join reservations r on r.space_id = s.id WHERE r.user_id = ${id}`;
      // const str = `SELECT * FROM reservations r inner join spaces s on r.space_id = s.id WHERE r.user_id = ${id}`;
      pool.query(str, (err, results) => {
        response(err, results);
      }) 
    },
    deleteReservation: (params, response) => {
      const { id } = params;
      console.log('id is', id) 
      const str = `DELETE FROM reservations where id = ${id}`
      pool.query(str, (err, results) => {
        response(err, results)
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