const express = require('express');
const router = express.Router();
const controller = require('./signup/controllers.js');
const resController = require('./reservation/controller.js');
const mapController = require('./map/controller.js');

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
  .route('/map/available')
  .get(mapController.findAvailability)
  
router
  .route('/signup')
  .post(controller.signup);

router.route("/login").post(auth.login);

module.exports = router;