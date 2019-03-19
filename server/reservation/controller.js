const db = require('../../database/models.js').reservations;

module.exports = {
  makeReservation: (req, res) => {
    db.reserve(req.body, (err, id) => {
      if (err) {
        console.error(err);
        res.status(400).end();
      } else {
        console.log('MADE RESERVATION')
        res.status(201).json(id);
      }
    })
  }
}