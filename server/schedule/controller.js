const db = require('../../database/models.js').schedule;

module.exports = {
  getReservations: (req, res) => { 
    db.getReservations(req.params, (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).end();
      } else {
        res.status(200).json(data.rows);
      }
    })
  },
  deleteReservation: (req, res) => {
    const { id } = req.body
    db.deleteReservation(req.body, (err, data) => {
      if(err) {
        res.status(404).end();
      } else {
        console.log('deleted')
        res.status(200).send();
      }
    })
  }
}