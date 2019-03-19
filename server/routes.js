const express = require('express');
const router = express.Router();
const controller = require('./controllers.js');
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
  
router.post('/users', controller.users.post);


module.exports = router;