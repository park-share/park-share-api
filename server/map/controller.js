const db = require('../../database/models.js').map;

module.exports = {
  findAvailability: (req, res) => {
    db.availableSpots(req.body, (err, data) => {
      if (err) {
        console.error(err);
        res.status(404).end();
      } else {
        console.log('FOUND AVAILABLE SPOTS');
        res.status(200).json(data.rows);
      }
    })
  }
}