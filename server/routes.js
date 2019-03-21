const express = require('express');
const router = express.Router();
const controller = require('./signup/controllers.js');
const resController = require('./reservation/controller.js');

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


module.exports = router;