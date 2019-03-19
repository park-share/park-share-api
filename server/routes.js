const express = require('express');
const router = express.Router();
const controller = require('./controllers.js')


router.post('/users/:id', controller.users.post);


module.exports = router;