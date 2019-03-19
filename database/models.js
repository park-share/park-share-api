const pool = require('./index.js');

module.exports = {
  users: {
    post: function (params, callback) {
      const queryStr = "insert into users(firstname,lastname,email,user_password,birthday,phone) values (?,?,?,?,?,?)";
      pool.query(queryStr, params, (err, results) => {
        callback(results)
      });
    }
  }
}