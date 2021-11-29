// ======================================================
//  Create webpage for the Restaurant Owner for Orders
// ======================================================

const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM customers;`)
      .then(data => {
        const menu = data.rows;
        res.json({ menu });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
