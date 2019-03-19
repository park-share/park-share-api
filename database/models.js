const pool = require('./index.js');

module.exports = {
  users: {
    post: function (params, callback) {
      const queryStr = "insert into users(firstname,lastname,email,user_password,birthday,phone) values (?,?,?,?,?,?)";
      pool.query(queryStr, params, (err, results) => {
        callback(results)
      });
    }
  },
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
    }
  }
}