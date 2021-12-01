// ======================================================
//  Create webpage for the Restaurant Owner for Orders
// ======================================================

const express = require("express");
const router = express.Router();
const client = require('twilio')(process.env.ACCOUNTSID ,process.env.AUTHTOKEN);

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT customers.first_name as first_name, customers.last_name as last_name, customers.email as email,
    customers.phone_no as phone_no, orders.id as orders_id, order_details.qty as qty, orders.status as status, order_details.id as line_id,
    orders.date as order_date, orders.total as total, products.title as product_name
    FROM orders
    JOIN customers ON customers.id = customer_id
    JOIN order_details ON orders.id = order_id
    JOIN products on products.id = product_id
    WHERE orders.status = 'Placed'
    ORDER BY orders.id;`)
      .then((data) => {
        const order_details = data.rows;
        console.log(data.rows);
        const arrayLength = order_details.length;
        console.log(new Date(order_details[0].order_date).toLocaleDateString('fr-CA'))
        const templateVars = { dataArray: order_details, length : arrayLength };
        res.render("resturantPage", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const estimationtime = req.body.estimatedtime;
    const orderid = req.body.order_no;
    const accept = req.body.acceptButton;
    const reject = req.body.rejectButton;

   if (accept) {
      db.query(`UPDATE orders
                    SET status = 'Accepted',
                        estimated_time = ${estimationtime}
                    WHERE id = ${orderid};`)
        .then((data) => {
         res.redirect("resturantPage");
          const sendSMS = (estimated_time) => {
            client.messages.create({
              to: '+16479475007',
              from: '+12267991422',
              body: `Your order with Mocha & Chai has been accepted and will be ready in ${estimated_time} mins!`
            })
            .then(message => console.log(message))
            .catch((err) => {
              console.log(err);
            });
          };
          sendSMS(estimationtime);
          })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });

    } else if (reject) {
        db.query(`UPDATE orders
          SET status = 'Rejected'
          WHERE id = ${orderid};`)
        .then((data) => {
          res.redirect("resturantPage");
          const sendSMS = () => {
          client.messages.create({
            to: '+16479475007',
            from: '+12267991422',
            body: `Sorry your order with Mocha & Chai has been rejected as the items are not available!`
          })
          .then(message => console.log(message))
          .catch((err) => {
            console.log(err);
          });
        };
        sendSMS();
       })

        .catch((err) => {
        res.status(500).json({ error: err.message });
        });
   }
});

  return router;
};


