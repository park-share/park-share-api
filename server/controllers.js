const db = require('../database/index.js');

module.exports = {
  users: {
    post: (req, res) => {
      console.log('in post');
      const { firstName, lastName, email,user_password,birthday,phone } = req.body;
      db.users.post(firstName, lastName, email, user_password, birthday, phone, (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(201).send(results)
        }
      })
    }

  }
}