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
    // console.log("here");
    db.query(
      `INSERT INTO customers (first_name, last_name, email, phone_no)
      VALUES ('${first_name}', '${last_name}', '${email}', '${phone_no}')
      RETURNING *;
    `
    ).then((data) => {
      // console.log("customers - success");
      const { total } = req.body;
      const order_url = "http://localhost:8080/orderPage";
      const status = "Pending";
      const customer_id = data.rows[0].id;
      // console.log(total, order_url, status, customer_id);
      db.query(
        `INSERT INTO orders (total, order_url, status, estimated_time, customer_id)
          VALUES (${total}, '${order_url}', '${status}', 0, '${customer_id}')
          RETURNING *;
        `
      ).then((data) => {
        // console.log("orders - success");

        const { cart } = req.body;
        const order_id = data.rows[0].id;
        // ASK IF SHOULD CALC THE QUANTITY FOR A REPEAT ITEM
        cart.forEach((item) => {
          // console.log(item);
          console.log(item.qty, order_id, item.id);
          db.query(
            `INSERT INTO order_details (qty, order_id, product_id)
            VALUES (${Number(item.qty)}, ${order_id}, ${Number(item.id)})
            RETURNING *;
              `
          )
            .then((data) => {
              console.log("order details success", data.rows);
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        });
      });
    });

    // orders table

    //     INSERT INTO order_details (qty, order_id, product_id)
    // VALUES (2, 1, 1);

    // INSERT INTO order_details (qty, order_id, product_id)
    // VALUES (1, 1, 2);

    // INSERT INTO order_details (qty, order_id, product_id)
    // VALUES (1, 1, 5);
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
