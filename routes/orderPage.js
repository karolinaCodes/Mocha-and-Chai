// ======================================================
//  Create webpage for the customer for Orders
// ======================================================

require("dotenv").config();
const { Template } = require("ejs");
const express = require("express");
const router = express.Router();
const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

const sendSMS = (first_name, order_url, order_id) => {
  //console.log("im in the sendSMS--");
  client.messages
    .create({
      to: "+16479475007",
      from: "+12267991422",
      body: `Hey ${first_name}, your order with Mocha & Chai has been placed. Order details are
    Id: ${order_id} url :${order_url}.`,
    })
    .then((message) => console.log(message))
    .catch((err) => {
      console.log(err);
    });
};

const sendSMStoResturantOwner = (order_id) => {
  //console.log("im in the sendSMS--");
  client.messages
    .create({
      to: "16479475007",
      from: "+12267991422",
      body: `Mocha & Chai has a new order Id:${order_id}. Start Brewing!`,
    })
    .then((message) => console.log(message))
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

  // retrieve products data from products table //
  router.get("/products", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // add customer details, order, and order details in DB when user submits order //
  router.post("/", (req, res) => {
    const { first_name } = req.body;
    const { last_name } = req.body;
    const { email } = req.body;
    const { phone_no } = req.body;

    // insert into customer data into customers table
    db.query(
      `INSERT INTO customers (first_name, last_name, email, phone_no)
      VALUES ('${first_name}', '${last_name}', '${email}', '${phone_no}')
      RETURNING *;
    `
    )
      .then((data) => {
        console.log("customers table- success");
        const { total } = req.body;
        const order_url = "http://localhost:8080/orderPage";
        const status = "Placed";
        const customer_id = data.rows[0].id;

        // insert into order data into orders table
        db.query(
          `INSERT INTO orders (total, order_url, status, estimated_time, customer_id)
          VALUES (${total}, '${order_url}', '${status}', 0, '${customer_id}')
          RETURNING *;
        `
        )
          .then((data) => {
            console.log("orders table- success");
            const { cart } = req.body;
            const order_id = data.rows[0].id;

            // insert into order details data into order_details table
            cart.forEach((item) => {
              db.query(
                `INSERT INTO order_details (qty, order_id, product_id)
                VALUES (${Number(item.qty)}, ${order_id}, ${Number(item.id)})
                RETURNING *;
                `
              )
                .then((data) => {
                  console.log("order details table - success", data.rows);
                  try{
                    sendSMS(first_name,last_name, order_url, order_id);
                  } catch(error){
                    console.log(error);
                  }
                  //sendSMS(first_name,last_name,phone_no, order_url)
                  try{
                     sendSMStoResturantOwner(order_id);
                     } catch(error){
                    console.log(error);
                  }
                  res.send(data.rows[0]);
                })
                .catch((err) => {
                  res.status(500).json({ error: err.message });
                });
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
