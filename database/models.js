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
      const str = `INSERT INTO reservations (user_id, space_id, start_res, end_res) VALUES ('${user_id}', '${space_id}', '${start_res}', '${end_res}');`;
      pool.query(str, (err, msg) => {
        response(err, msg);
      })
    }
  }
}