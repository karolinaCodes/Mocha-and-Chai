// ======================================================
//  Create webpage for the Restaurant Owner for Orders
// ======================================================

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT customers.first_name as first_name, customers.last_name as last_name, customers.email as email, customers.phone_no as phone_no, orders.id as orders_id, orders.status as status, order_details.id as line_id, orders.date as order_date, orders.total as total, products.title as product_name
    FROM orders
    JOIN customers ON customers.id = customer_id
    JOIN order_details ON orders.id = order_id
    JOIN products on products.id = product_id
    ORDER BY orders.id;`)
      .then((data) => {
        const order_details = data.rows;
        const templateVars = { dataArray: order_details };
        res.render("resturantPage", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
