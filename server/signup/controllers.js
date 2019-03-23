const db = require('../../database/models.js');
const bcrypt = require("bcrypt");
function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim()!= '';
  const validPassword = typeof user.user_password =='string' && user.user_password.trim()!= '' && user.user_password.trim().length >= 6;
  return validEmail && validPassword;
}


module.exports = {
 
    signup: async (req, res, next) => {
      console.log('in post');
      console.log(req.body)
      if(validUser(req.body)) {
        // db.getOneByEmail(req.body.email)
        // .then(user => {
        //   console.log('user',user);
        //   res.json({
        //     user,message:'yay'
        //   });
        // });
        var salt=bcrypt.genSaltSync(8);
        var hash = bcrypt.hashSync(req.body.user_password,salt);
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
