const express = require('express');
const router = express.Router();
const controller = require('./signup/controllers.js');
const resController = require('./reservation/controller.js');
const auth = require('./login/auth.js');
router
  .route('/reservations/post')
  .post(resController.makeReservation);

router
  .route('/reservations/start')
  .put(resController.startReservation);

router
  .route('/reservations/end')
  .put(resController.endReservation);
  
router
  .route('/signup')
  .post(controller.signup);

router.route("/login").post(auth.login);

// router
//   .route('/login')
//   .get(loginController.login);

// router 
//   .route('/login')
//   .post(loginController.login);

// router 
//   .route('/signin')
//   .post(controller.signin);

module.exports = router;