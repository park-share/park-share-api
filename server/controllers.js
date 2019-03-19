const db = require('../database/models.js');

module.exports = {
  users: {
    post: (req, res) => {
      console.log('in post');
      console.log(req.body)
      var params = [req.body['firstname'],req.body['lastname'],req.body['email'],req.body['user_password'],req.body['birthday'],req.body['phone']]
      db.users.post(params, (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(201).send(results)
        }
      })
    }

  }
}