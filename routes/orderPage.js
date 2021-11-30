// ======================================================
//  Create webpage for the customer for Orders
// ======================================================

const { Template } = require("ejs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then((data) => {
        const menu = data.rows;
        const templateVars = { menuArray: menu };
        res.render("orderPage", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/products", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    // console.log(req.body, "HEEELOOOO");
    // JSON.parse(req.body);
    // customers table
    const { first_name } = req.body;
    const { last_name } = req.body;
    const { email } = req.body;
    const { phone_no } = req.body;
    console.log("here");
    db.query(
      `INSERT INTO customers (first_name, last_name, email, phone_no)
      VALUES ('${first_name}', '${last_name}', '${email}', '${phone_no}')
      RETURNING *;
    `
    )
      .then((data) => {
        console.log("customers success", data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

    // orders table

    // const { total } = req.body;
    // const order_url = "http://localhost:8080/orderPage";
    // const status = active;

    // db.query(
    //   `INSERT INTO customers (first_name, last_name, email, phone_no)
    // VALUES(${first_name}, ${last_name}, ${email}, ${phone_no});
    // `
    // )
    //   .then((data) => {})
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });

    //   customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE
    // );

    //order details table
    // const { cart } = req.body;
  });

  return router;
};
