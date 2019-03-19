const express = require('express');
const router = express.Router();
const controller = require('./controllers.js');
const resController = require('./reservation/controller.js');

router
  .route('/reservations/post')
  .post(resController.makeReservation);
router.post('/users', controller.users.post);


module.exports = router;