const db = require('../../database/models.js').reservations;

module.exports = {
  makeReservation: (req, res) => {
    db.reserve(req.body, (err, id) => {
      if (err) {
        console.log('controller error', err);
        res.status(404).end();
      } else {
        console.log('MADE RESERVATION')
        res.status(201).json(id);
      }
    })
  },
  chargeReservation: async (req, res) => {
    try {
      let { status } = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
      res.json({ status });
    } catch (err) {
      console.error(err)
      res.status(500).end('PURCHASE FAILED');
    }
  },
  startReservation: (req, res) => {
    db.startRes(req.body, (err) => {
      if (err) {
        console.error(err);
        res.status(404).end();
      } else {
        console.log('UPDATE RESERVATION START TIME');
        res.status(202).end();
      }
    })
  },
  endReservation: (req, res) => {
    db.endRes(req.body, (err) => {
      if (err) {
        console.error(err);
        res.status(404).end();
      } else {
        console.log('UPDATE RESERVATION END TIME');
        res.status(202).end();
      }
    })
  }
}