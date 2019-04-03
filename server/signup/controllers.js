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
        console.log('in server')
        var params = [req.body['email']];
        db.users.getOneByEmail(params, (err, results)=> {
          if (results) {
            // res.status(201).send(results)
            var salt=bcrypt.genSaltSync(8);
            var hash = bcrypt.hashSync(req.body.user_password,salt);
            console.log(hash);
            var params = [req.body['firstname'],req.body['lastname'],req.body['email'],hash,req.body['birthday'],req.body['phone']]
              db.users.post(params, (err, results) => {
              if (results) {
                res.status(201).send(results)
              } else {
                res.status(422).send(err)
              }
            })
          } else {
            console.log('err in server',err)
            res.send('email has already existed')
          }
        })
        
      } else {
        next(new Error('Invalid user'));
      }
    }
}
