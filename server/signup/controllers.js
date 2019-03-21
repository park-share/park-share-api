const db = require('../../database/models.js');
const bcrypt = require("bcrypt");
module.exports = {
    signup: (req, res) => {
      console.log('in post');
      console.log(req.body)
      var hash = bcrypt.hashSync(req.body.user_password,8);
      console.log(hash);
      var params = [req.body['firstname'],req.body['lastname'],req.body['email'],hash,req.body['birthday'],req.body['phone']]
        db.users.post(params, (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(201).send(results)
        }
      })
    }
}

