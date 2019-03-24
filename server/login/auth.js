// const express = require('express');
// const router = express.Router();
const jwt = require('jsonwebtoken');

// const passport = require("passport");
// /* POST login. */
// router.post('/login', function (req, res, next) {
//   passport.authenticate('local', { session: false }, (err, user, info) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: 'Something is not right',
//         user: user
//       });
//     }
//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }
//       // generate a signed son web token with the contents of user object and return it in the response
//       const token = jwt.sign(user, 'your_jwt_secret');
//       return res.json({ user, token });
//     });
//   })(req, res);
// });

const db = require("../../database/models.js");
const bcrypt = require("bcrypt");

module.exports = {
  login: (req, res, next) => {
    console.log(req.body)
    console.log('in post log in');
    var params = [req.body['email']];

    db.users.finduser(params, (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else { 
        if (bcrypt.compareSync(req.body.user_password,results.rows[0]["user_password"])) {
          jwt.sign(results.rows[0], "thisismykey", { expiresIn: '1h' }, (err, token) => {
            if(err) { console.log(err) }    
                res.send(token);
          });
          // res.status(200).json(results.rows[0]);
        } else {
          res.status(422).json('incorrect password')
        }
      } 
    });
  }
}



