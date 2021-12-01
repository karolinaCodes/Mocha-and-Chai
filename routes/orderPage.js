// ======================================================
//  Create webpage for the customer for Orders
// ======================================================

require("dotenv").config();
const { Template } = require("ejs");
const express = require("express");
const router = express.Router();
const client = require('twilio')(process.env.ACCOUNTSID ,process.env.AUTHTOKEN);

const sendSMS = (first_name,last_name,phone_no, order_url, order_id) => {
  console.log("im in the sendSMS--");
  client.messages.create({

    to: `${phone_no}`,
    from: '+12267991422',
    body: `Hello ${first_name} ${last_name} your order has been placed and  order id :
    ${order_id} please follow the order at url :${order_url} .`
  })
  .then(message => console.log(message))
  .catch((err) => {
    console.log(err);
  });
};

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
      const status = "Placed";
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
              console.log('sending message')
              try{
                sendSMS(first_name,last_name,phone_no, order_url, order_id);
              } catch(error){
                console.log(error);
              }
              //sendSMS(first_name,last_name,phone_no, order_url)
              console.log('message sent')
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
