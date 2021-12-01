// retrieve (by order number) estimated prep time for a specific order

const { Template } = require("ejs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:order_id", (req, res) => {
    const { order_id } = req.params;
    // console.log("order_id", order_id);

    db.query(
      `SELECT estimated_time
      FROM orders
      WHERE id = ${order_id};`
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
