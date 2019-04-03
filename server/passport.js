
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "user_password"
    },
    function(email, user_password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return UserModel.findOne({ email, user_password })
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect email or password."
            });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    }
  )
);

//passport-config.js
//Let's import some things!
// const { Strategy, ExtractJwt } = require('passport-jwt');
// //this is using ES6 Destructuring. If you're not using a build step,
// //this could cause issues and is equivalent to
// // const pp-jwt = require('passport-jwt');
// // const Strategy = pp-jwt.Strategy;
// // const ExtractJwt = pp-jwt.ExtractJwt;
// require('dotenv').config();
// const secret = process.env.SECRET || 'some other secret as default';
// const mongoose = require('mongoose');
// const User = require('./models/user');
// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: secret
// };
// //this sets how we handle tokens coming from the requests that come
// // and also defines the key to be used when verifying the token.
// module.exports = passport => {
//   passport.use(
//     new Strategy(opts, (payload, done) => {
//       User.findById(payload.id)
//         .then(user => {
//           if (user) {
//             return done(null, {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//             });
//           }
//           return done(null, false);
//         }).catch(err => console.error(err));
//     });
//            );
// };








// const passport = require('passport');
// const LocalStrategy = require("passport-local").Strategy;
// const winston = require('winston');
// const bcrypt = require("bcrypt");

// passport.use(new LocalStrategy((username, password, cb) => {
//   db.query('SELECT id, email, password, type FROM users WHERE email=$1', [email], (err, result) => {
//     if (err) {
//       winston.error('Error when selecting user on login', err)
//       return cb(err)
//     }

//     if (result.rows.length > 0) {
//       const first = result.rows[0]
//       bcrypt.compare(user_password, first.user_password, function (err, res) {
//         if (res) {
//           cb(null, { id: first.id, email: first.email })
//         } else {
//           cb(null, false)
//         }
//       })
//     } else {
//       cb(null, false)
//     }
//   })
// }))

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, cb) => {
//   db.query('SELECT id, email FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
//     if (err) {
//       winston.error('Error when selecting user on session deserialize', err)
//       return cb(err)
//     }

//     cb(null, results.rows[0])
//   })
// })