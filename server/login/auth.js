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
    var params = [req.body['email']];

    db.users.finduser(params, (err, results) => {
      if (results) {
        if (results.rows[0]['user_password']) {
          if (bcrypt.compareSync(req.body.user_password, results.rows[0]["user_password"])) {
            jwt.sign(results.rows[0], "thisismykey", { expiresIn: '1h' }, (err, token) => {
              res.send(results.rows[0]["email"]);
            });
          } else {
            res.send('Incorrect password')
          }
        }else {
          res.send("Username does not exist");
        }
      } else {
        res.send("Username does not exist");
      }



      // if (!results) {
      //   res.send("Username does not exist");
      // } else { 
      //   if (bcrypt.compareSync(req.body.user_password,results.rows[0]["user_password"])) {
      //     jwt.sign(results.rows[0], "thisismykey", { expiresIn: '1h' }, (err, token) => {
      //       // if(err) { console.log(err) }    
      //       res.send(results.rows[0]["email"]);
      //     });
      //     // res.status(200).json(results.rows[0]);
      //   } else {
      //     res.send('Incorrect password')
      //   }
      //   // res.send(results.rows[0]["email"])
      // } 
    });
  }
}



postLogin: (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.send('Username does not exist');
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            res.send(username);
          } else {
            res.send('Incorrect password');
          }
        });
      }
    });
}