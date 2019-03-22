const db = require('../../database/models.js');
const bcrypt = require("bcrypt");
function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim()!= '';
  const validPassword = typeof user.user_password =='string' && user.user_password.trim()!= '' && user.user_password.trim().length >= 6;
  return validEmail && validPassword;
}


module.exports = {
 
    signup: async (req, res, next) => {
      // console.log('in post');
      console.log(req.body)
      if(validUser(req.body)) {
        // db.getOneByEmail(req.body.email)
        // .then(user => {
        //   console.log('user',user);
        //   res.json({
        //     user,message:'yay'
        //   });
        // });
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
      } else {
        next(new Error('Invalid user'));
      }
    }
}
// const LocalStrategy = require('password-local').Strategy;

// module.exports = {
//   signup: (async function (req, res) {
//     try {
//       const client = await pool.connect();
//       await client.query('BEGIN')
//       var hash = await bcrypt.hashSync(req.body.user_password, 5);
//       await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email" = $1', [req.body.firstname], function(err,result) {
//         if (result.rows[0]) {
//           req.flash(
//             "warning",
//             "This email address is already registered. <a href='/login'>Log in!</a>"
//           );
//           res.redirect('/signup');
//         }
//         else {
//           client.query('INSERT INTO users ("firstname","lastname","email","password") VALUES ($1,$2,$3,$4)', [req.body['firstname'], req.body['lastname'], req.body['email'], hash],function(err, result) {
//             if (err) {
//               console.log(err)
//             } else {
//               client.query('COMMIT')
//               console.log(result)
//               req.flash('success', 'user created')
//               // res.redirect('/login');
//               return;
//             }
//           });
//         }
//       }));
//       client.release();
//     }
//     catch(err) {
//       throw (err)
//     }
//   })
// }
